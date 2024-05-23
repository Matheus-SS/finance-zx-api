import { Response } from 'express';
import { randomUUID }  from 'node:crypto';

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

export function getUnixTime(): number {
  return Math.floor(new Date().getTime()/1000.0)
}

export function uuid(): string {
  return randomUUID()
}

export function convertHourToMili(hours: number) {
  const MIN = 60 // sec
  const HOUR = MIN * 60 // 1 hora
  return (hours * HOUR) * 1000  
}

export function convertMiliToSec(mili: number) {
  return mili / 1000  
}