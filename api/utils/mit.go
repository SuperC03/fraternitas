package utils

import (
	"context"
	"encoding/json"
	"fmt"
	"io"
	"net/http"
)

type MitUserInfo struct {
	DisplayName string
	PhoneNumber string
	ClassYear   string
	Department  string
}

// MitGetUser makes a best-effort attempt to return a complete MitUserInfo object,
// but will leave fields blank if it is unable to find/parse info
func MitGetUser(
	ctx context.Context,
	peopleApiUrl string,
	clientId string,
	clientSecret string,
	kerb string,
) (*MitUserInfo, error) {
	url := peopleApiUrl + "/" + kerb
	req, err := http.NewRequestWithContext(ctx, http.MethodGet, url, nil)
	if err != nil {
		return nil, fmt.Errorf("unable to create http client: %w", err)
	}
	req.Header.Add("client_id", clientId)
	req.Header.Add("client_secret", clientSecret)
	resp, err := http.DefaultClient.Do(req)
	if err != nil {
		return nil, fmt.Errorf("unable to query MIT People API: %w", err)
	}
	if resp.StatusCode != 200 {
		if resp.StatusCode == 400 {
			return nil, fmt.Errorf("invalid kerberos")
		} else {
			return nil, fmt.Errorf("unable to query MIT People API")
		}
	}
	// Sorry in advanced if you have to debug the next thirty lines or so,
	// here's hoping they don't change the API too much heh heh
	type jsonResponse struct {
		Item struct {
			DisplayName  string `json:"displayName"`
			PhoneNumber  string `json:"phoneNumber"`
			Affiliations []struct {
				ClassYear   string `json:"classYear"`
				Departments []struct {
					Code string `json:"code"`
					Name string `json:"name"`
				}
			} `json:"affiliations"`
		} `json:"item"`
	}
	var jsonData jsonResponse
	if err = json.NewDecoder(resp.Body).Decode(&jsonData); err != nil {
		return nil, fmt.Errorf("unable to parse MIT People API response: %w", err)
	}
	var info MitUserInfo
	// Attempt to assign Name and Phone
	info.DisplayName = jsonData.Item.DisplayName
	info.PhoneNumber = jsonData.Item.PhoneNumber
	// Attempt to assign Class Year
	if len(jsonData.Item.Affiliations) > 0 {
		info.ClassYear = jsonData.Item.Affiliations[0].ClassYear
		// Attempt to assign Department
		if len(jsonData.Item.Affiliations[0].Departments) > 0 {
			dept := jsonData.Item.Affiliations[0].Departments[0]
			info.Department = dept.Code + " - " + dept.Name
		}
	}
	return &info, nil
}

// MitGetUserImage returns an image corresponding to the provided kerb.
// It will return an MIT logo if the kerb doesn't exist
func MitGetUserImage(
	ctx context.Context,
	imageApiUrl string,
	clientId string,
	clientSecret string,
	kerb string,
) (io.Reader, error) {
	url := imageApiUrl + "/" + kerb
	req, err := http.NewRequestWithContext(ctx, http.MethodGet, url, nil)
	if err != nil {
		return nil, fmt.Errorf("unable to create http client: %w", err)
	}
	req.Header.Add("client_id", clientId)
	req.Header.Add("client_secret", clientSecret)
	resp, err := http.DefaultClient.Do(req)
	if err != nil {
		return nil, fmt.Errorf("unable to query MIT Image API: %w", err)
	}
	if resp.StatusCode != 200 {
		if resp.StatusCode == 400 {
			return nil, fmt.Errorf("invalid kerberos")
		} else {
			return nil, fmt.Errorf("unable to query MIT Image API")
		}
	}
	return resp.Body, nil
}
