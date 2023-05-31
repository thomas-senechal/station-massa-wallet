// Code generated by go-swagger; DO NOT EDIT.

package models

// This file was generated by the swagger tool.
// Editing this file might prove futile when you re-run the swagger generate command

import (
	"context"

	"github.com/go-openapi/errors"
	"github.com/go-openapi/strfmt"
	"github.com/go-openapi/swag"
	"github.com/go-openapi/validate"
)

// OperationResponse operation response
//
// swagger:model OperationResponse
type OperationResponse struct {

	// operation Id
	// Read Only: true
	OperationID string `json:"operationId,omitempty"`
}

// Validate validates this operation response
func (m *OperationResponse) Validate(formats strfmt.Registry) error {
	return nil
}

// ContextValidate validate this operation response based on the context it is used
func (m *OperationResponse) ContextValidate(ctx context.Context, formats strfmt.Registry) error {
	var res []error

	if err := m.contextValidateOperationID(ctx, formats); err != nil {
		res = append(res, err)
	}

	if len(res) > 0 {
		return errors.CompositeValidationError(res...)
	}
	return nil
}

func (m *OperationResponse) contextValidateOperationID(ctx context.Context, formats strfmt.Registry) error {

	if err := validate.ReadOnly(ctx, "operationId", "body", string(m.OperationID)); err != nil {
		return err
	}

	return nil
}

// MarshalBinary interface implementation
func (m *OperationResponse) MarshalBinary() ([]byte, error) {
	if m == nil {
		return nil, nil
	}
	return swag.WriteJSON(m)
}

// UnmarshalBinary interface implementation
func (m *OperationResponse) UnmarshalBinary(b []byte) error {
	var res OperationResponse
	if err := swag.ReadJSON(b, &res); err != nil {
		return err
	}
	*m = res
	return nil
}
