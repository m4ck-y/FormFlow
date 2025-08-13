import { http } from "@/api/http";

export class OtpService {
    async sendOtp(email: string) {
        return http.post(`/verification/email_otp?email=${email}`);
    }

    async verifyOtp(email: string, otp: string) {
        return http.post(`/verification/verify_otp?email=${email}&code=${otp}`);
    }
}