export function mapAuthError(message: string): string {
    const value = message.toLowerCase();

    if (value.includes("invalid login") || value.includes("invalid credentials")) {
        return "Incorrect email or password.";
    }
    if (value.includes("email not confirmed")) {
        return "Confirm your email, then try signing in again.";
    }
    if (value.includes("password should be") || value.includes("password is too")) {
        return "Password does not meet the security requirements.";
    }
    if (value.includes("rate") || value.includes("too many")) {
        return "Too many attempts. Wait a moment and try again.";
    }

    return "Unable to complete that request. Try again.";
}
