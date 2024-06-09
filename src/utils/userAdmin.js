import { eventBus } from './eventBus';

const errorMessage = (message) => {
    eventBus.emit('SNACKBAR_SHOW', { severity: 'error', message });
};

const Auth = {};

export const AuthSignUp = async (userData) => {
    try {
        const { user } = await Auth.signUp(userData);

        return user !== null;
    } catch (error) {
        console.log('error signing up:', error);
        errorMessage(error.message);
        return false;
    }
};

export const AuthUpdateAttributes = async (userData) => {
    try {
        let user = await Auth.currentAuthenticatedUser();

        const result = await Auth.updateUserAttributes(user, {
            'name': userData.fullname,
            'phone_number': userData.phone,
        });

        user = await Auth.currentAuthenticatedUser();

        return result !== null && user;
    } catch (error) {
        console.log('error update attributes:', error);
        errorMessage(error.message);
        return false;
    }
};

export const AuthConfirmEmail = async (email, code) => {
    try {
        await Auth.confirmSignUp(email, code);
        return true;
    } catch (error) {
        errorMessage(error.message);
        return false;
    }
};

export const AuthResendConfirmationCode = async (email) => {
    try {
        await Auth.resendSignUp(email);
        return true;
    } catch (error) {
        errorMessage(error.message);
        return false;
    }
};


export const AuthSignIn = async (email, password) => {
    try {
        const user = await Auth.signIn(email, password);
        
        if (user?.challengeName === 'NEW_PASSWORD_REQUIRED') {
            window.location = `/challenge-new-password/${email}`;
            return false;
        }
        return user !== null;
    } catch (error) {
        
        if (error.code === 'UserNotConfirmedException') {
            window.location = `/confirm-email/${email}`;
            return false;
        }
        errorMessage(error.message);
        return false;
    }
};

export const AuthCompletePassword = async (email, oldPassword, newPassword) => {
    try {
        
        const user = await Auth.signIn(email, oldPassword);
        
        const result = await Auth.completeNewPassword(user, newPassword, {});
        
        await Auth.signOut();

        return result !== null;
    } catch (error) {
        errorMessage(error.message);
        console.log('error change password:', error);
        return false;
    }
};

export const AuthForgotPassword = async (email) => {
    try {
        await Auth.forgotPassword(email);

        return true;
    } catch (error) {
        errorMessage(error.message);
        return false;
    }
};

export const AuthChangeMyPassword = async (oldPassword, newPassword) => {
    try {

        const user = await Auth.currentAuthenticatedUser();

        const result = await Auth.changePassword(user, oldPassword, newPassword);

        return result !== null;
    } catch (error) {
        errorMessage(error.message);
        console.log('error change password:', error);
        return false;
    }
};

export const AuthForgotPasswordNewPwd = async (email, code, newPassword) => {
    try {
        await Auth.forgotPasswordSubmit(email, code, newPassword);

        return true;
    } catch (error) {
        errorMessage(error.message);
        return false;
    }
};

export const AuthSignOut = async () => {
    await Auth.signOut();
};

export const GetIdToken = async () => {
    try {
        return (await Auth.currentSession()).getIdToken().getJwtToken();
    } catch (error) {
        return '';
    }
};

export const GetCurrentUser = async (showError = true) => {
    try {
        return await Auth.currentAuthenticatedUser();
    } catch (error) {
        if (showError)
            errorMessage("User not logged");
        return null;
    }
}
