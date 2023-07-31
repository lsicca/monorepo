export interface User {
	email: string;
	password?: string;
	passwd?: string;
	login: string;
	isAdmin: boolean;
	isActive: boolean;
	passwordToken?: string;
	connectionInfos?: string;
	createdAt?: Date;
	updatedAt?: Date;
}

export interface UserRegister {
	email: string;
	password: string;
	login: string;
}

export interface UserLogin {
	password: string;
	login: string;
}

export interface AuthResponse {
	token: string;
	expiresIn: number;
}
