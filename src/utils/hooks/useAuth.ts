import * as ErrorMessages from '../../constants/errorConstants';
import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginUser, logout, signUpUser } from "../../store/slices/authSlice";
import type { AppDispatch } from "../../store/store";
import type { Roles } from '../../Types';
import { extractApiErrorMessage } from '../helpers/helperUtils';

export type SignInCredential = {
    email: string;
    password: string;
};
export type SignInResult = {
    status: "success" | "failed";
    message: string;
    userType?: Roles;
}

export interface LoginResponse {
    token?: string;
    id?: string;
    email?: string;
    name?: string;
    role?: string | null;
    message?: string;
    status: string;
    [key: string]: unknown;
}

function useAuth() {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();

    const signIn = async (email: string, password: string): Promise<SignInResult> => {
        try {
            const response = await SignInAPI(email, password);
            if (response && response.userId) {
                return {
                    status: "success",
                    message: "Logged in successfully",
                    userType: response.role as Roles,
                };
            }
            return {
                status: "failed",
                message: ErrorMessages.ERR_LOGIN_FAILED,
            }
        } catch (error: unknown) {
            const errorMessage = ErrorMessages.ERR_INVALID_EMAIL_OR_PASSWORD;
            return {
                status: 'failed',
                message: extractApiErrorMessage(error, errorMessage),
            };
        }
    };

    const SignInAPI = async (email: string, password: string): Promise<LoginResponse | undefined> => {
        const result = await dispatch(loginUser({ email, password })).unwrap();
        return result as LoginResponse | undefined;
    };

    const signUp = async (name: string, email: string, password: string, role: Roles) => {
        try {
            await dispatch(signUpUser({ name, email, password, role })).unwrap();
            return {
                status: "success",
                message: "User registered successfully",
                userType: role,
            };
        } catch (error) {
            return {
                status: 'failed',
                message: extractApiErrorMessage(error, ErrorMessages.ERR_REGISTER_FAILED),
            };
        }
    }

    const signOut = useCallback(() => {
        try {
            logout();
        } catch (error) {
            console.error('Logout API error:', error);
        } finally {
            dispatch(logout());
            navigate('/');
        }
    }, [dispatch, navigate]);
    return {
        signIn,
        signOut,
        signUp,
    };
}

export default useAuth;
