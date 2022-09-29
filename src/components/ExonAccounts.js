import React, { createContext } from 'react';
import { CognitoUser, AuthenticationDetails } from 'amazon-cognito-identity-js';
import Pool from 'src/pages/userspool.js';
import Router from 'next/router';

const AccountContext = createContext();

const ExonAccounts = (props) => {
  const getSession = async () =>
    await new Promise((resolve, reject) => {
      const user = Pool.getCurrentUser();
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
      const user = new CognitoUser({ Username, Pool });
      const callback = (err, result) => {
        if (err) {
          error(err);
          return;
        }
        success(result);
      };

      user.confirmRegistration(Verification, true, callback);
    });

  const authenticate = async (Username, Password) =>
    await new Promise((resolve, reject) => {
      const user = new CognitoUser({ Username, Pool });
      const authDetails = new AuthenticationDetails({ Username, Password });

      user.authenticateUser(authDetails, {
        onSuccess: (data) => {
          console.log('onSuccess:', data);
          resolve(data);
        },

        onFailure: (err) => {
          console.error('onFailure:', err);
          reject(err);
        },

        newPasswordRequired: (data) => {
          console.log('newPasswordRequired:', data);
          resolve(data);
        },
      });
    });

  const logout = () => {
    const user = Pool.getCurrentUser();
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
