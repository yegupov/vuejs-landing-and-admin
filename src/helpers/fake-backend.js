import { data } from './data'

export function configureFakeBackend() {
    let realFetch = window.fetch;

    window.fetch = function (url, opts) {
        return new Promise((resolve, reject) => {
            // wrap in timeout to simulate server api call
            setTimeout(() => {

                if (opts.method === 'POST') {
                  // AUTHENTICATE
                  if (url.endsWith('/users/auth')) {
                      // get parameters from post request
                      let params = JSON.parse(opts.body);

                      // find if any user matches login credentials
                      let filteredUsers = data.users.filter(user => {
                          return user.username === params.username && user.password === params.password;
                      });

                      if (filteredUsers.length) {
                          // if login details are valid return user details and fake jwt token
                          let user = filteredUsers[0];
                          let responseJson = {
                              id: user.id,
                              username: user.username,
                              email: user.email,
                              firstName: user.firstName,
                              lastName: user.lastName,
                              avatar: user.avatar,
                              token: 'fake-jwt-token'
                          };
                          resolve({ ok: true, text: () => Promise.resolve(JSON.stringify(responseJson)) });
                      } else {
                          // else return error
                          reject('Username or password is incorrect');
                      }

                  } else if (url.endsWith('/reviews/create')) {
                    if (opts.headers) resolve({ ok: true, text: () => Promise.resolve(JSON.stringify({message: 'Review can be added'})) });
                    else reject('Review can not be added');

                  } else {
                    // check for fake auth token in header and return users if valid, this security is implemented server side in a real application
                    if (opts.headers && opts.headers.Authorization === 'Bearer fake-jwt-token') resolve({ ok: true, text: () => Promise.resolve(JSON.stringify({message: 'Access is allowed'})) });
                    else reject('Unauthorised');
                  }

                  return;
                }

                if (opts.method === 'GET') {
                  // GET USERS
                  if (url.endsWith('/users')) {
                    // check for fake auth token in header and return users if valid, this security is implemented server side in a real application
                    if (opts.headers && opts.headers.Authorization === 'Bearer fake-jwt-token') {
                        resolve({ ok: true, text: () => Promise.resolve(JSON.stringify(data.users)) });
                    } else {
                        // return 401 not authorised if token is null or invalid
                        reject('Unauthorised');
                    }
                  }

                  if (url.endsWith('/works')) resolve({ ok: true, text: () => Promise.resolve(JSON.stringify(data.works)) });
                  else if (url.endsWith('/reviews')) resolve({ ok: true, text: () => Promise.resolve(JSON.stringify(data.reviews)) });
                  else if (url.endsWith('/skills')) resolve({ ok: true, text: () => Promise.resolve(JSON.stringify(data.skills)) });
                  else reject('This data is not in the database.');

                  return;
                }

                // pass through any requests not handled above
                realFetch(url, opts).then(response => resolve(response));

            }, 500);
        });
    }
}
