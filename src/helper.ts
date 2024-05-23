import { Response } from 'express';

export function ServerResponse(res: Response, status: number, message: any) {
  return res.status(status).json({
    ok: status <= 400 ? true : false, 
    message: message
  })
}

export const http = {
  StatusUnprocessable: 422,
  StatusInternalServer: 500,
  StatusConflict: 409,
  StatusCreated: 201,
  StatusOk: 200
}

export function IsNullUndefinedOrEmpty(value: any): boolean {
  if (value === "" || value === undefined || value === null) {
    return true
  }  
  return false
}

export function hasMaxLength(value: any, maxLength: number): boolean {
  if (value?.length > maxLength) {
    return true
  }
  return false
}

export function hasMinLength(value: any, minLength: number): boolean {
  if (value?.length < minLength) {
    return true
  }
  return false
}