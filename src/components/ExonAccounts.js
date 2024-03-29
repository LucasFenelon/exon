import React, { createContext } from 'react';
import { CognitoUser, AuthenticationDetails } from 'amazon-cognito-identity-js';
import UserPool from 'src/pages/userspool';
import Router from 'next/router';
import { newTracker } from '@snowplow/browser-tracker';
import {
  trackPageView,
  trackSelfDescribingEvent,
} from '@snowplow/browser-tracker';

const AccountContext = createContext();

const ExonAccounts = (props) => {
  const getSession = async () =>
    await new Promise((resolve, reject) => {
      const user = UserPool.getCurrentUser();
      if (user) {
        user.getSession(async (err, session) => {
          if (err) {
            reject();
          } else {
            const attributes = await new Promise((resolve, reject) => {
              user.getUserAttributes((err, attributes) => {
                if (err) {
                  reject(err);
                } else {
                  const results = {};

                  for (let attribute of attributes) {
                    const { Name, Value } = attribute;
                    results[Name] = Value;
                  }

                  resolve(results);
                }
              });
            });

            resolve({
              user,
              ...session,
              ...attributes,
            });
          }
        });
      } else {
        reject();
      }
    });

  const confirm = async (Username, Verification) =>
    await new Promise((success, error) => {
      const user = new CognitoUser({ Username: Username, Pool: UserPool });
      const callback = (err, result) => {
        if (err) {
          error(err);
          return;
        }
        success(result);
      };

      user.confirmRegistration(Verification, true, callback);
    });

  const forgot = async (Username) =>
    await new Promise((resolve, reject) => {
      console.log('passei');
      console.log('Username -> ' + Username);
      const user = new CognitoUser({ Username: Username, Pool: UserPool });
      console.log('aqui');
      console.log(user);

      user.forgotPassword({
        onSuccess: (data) => {
          console.log('onSuccess:', data);
          resolve(data);
        },

        onFailure: (err) => {
          console.error('onFailure:', err);
          reject(err);
        },

        // inputVerificationCode: (data) => {
        //   console.log('inputVerificationCode:', data);
        //   resolve(data);
        // },
      });
    });

  const confirmReset = async (Code, Username, Password) =>
    await new Promise((resolve, reject) => {
      const user = new CognitoUser({ Username: Username, Pool: UserPool });

      user.confirmPassword(Code, Password, {
        onSuccess: (data) => {
          console.log('onSuccess:', data);
          resolve(data);
        },

        onFailure: (err) => {
          console.error('onFailure:', err);
          reject(err);
        },
      });
    });

  const authenticate = async (Username, Password) =>
    await new Promise((resolve, reject) => {
      const user = new CognitoUser({ Username: Username, Pool: UserPool });
      const authDetails = new AuthenticationDetails({ Username, Password });

      user.authenticateUser(authDetails, {
        onSuccess: (data) => {
          console.log('onSuccess:', data);
          resolve(data);
        },

        onFailure: (err) => {
          console.error('onFailure:', err);
          console.log('login fail !');
          reject(err);
        },

        newPasswordRequired: (data) => {
          console.log('newPasswordRequired:', data);
          resolve(data);
        },
      });
    });

  const logout = () => {
    const user = UserPool.getCurrentUser();
    if (user) {
      user.signOut();
      Router.push('/');
    }
  };

  const sessionLost = () => {
    Router.push('/');
  };

  return (
    <AccountContext.Provider
      value={{
        confirm,
        forgot,
        confirmReset,
        authenticate,
        getSession,
        logout,
        sessionLost,
      }}
    >
      {props.children}
    </AccountContext.Provider>
  );
};

export { ExonAccounts, AccountContext };
