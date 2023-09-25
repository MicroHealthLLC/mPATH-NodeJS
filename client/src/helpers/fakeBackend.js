export { fakeBackend };

function fakeBackend() {
    let realFetch = window.fetch;
    window.fetch = function (url, opts) {
        return new Promise((resolve, reject) => {
            // wrap in timeout to simulate server api call
            setTimeout(handleRoute, 500);

            function handleRoute() {
                switch (true) {
                    case url.endsWith('/users/authenticate') && opts.method === 'POST':
                        return authenticate();
                    case url.endsWith('/users/register') && opts.method === 'POST':
                        return register();
                    case url.endsWith('/users') && opts.method === 'GET':
                        return getUsers();
                    case url.match(/\/users\/\d+$/) && opts.method === 'GET':
                        return getUserById();
                    case url.match(/\/users\/\d+$/) && opts.method === 'PUT':
                        return updateUser();
                    case url.match(/\/users\/\d+$/) && opts.method === 'DELETE':
                        return deleteUser();
                    default:
                        // pass through any requests not handled above
                        return realFetch(url, opts)
                            .then(response => resolve(response))
                            .catch(error => reject(error));
                }
            }

            // route functions

            function authenticate() {
                const { username, password } = body();
                // Send the username and password to the server for authentication
                fetch('/users/authenticate', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ username, password })
                })
                    .then(response => response.json())
                    .then(data => {
                        if (data.token) {
                            // Store the token in local storage
                            localStorage.setItem('token', data.token);
                            // Return the authenticated user details
                            return ok({
                                id: data.id,
                                username: data.username,
                                firstName: data.firstName,
                                lastName: data.lastName,
                                token: data.token
                            });
                        } else {
                            return error('Username or password is incorrect');
                        }
                    })
                    .catch(error => reject(error));
            }

            function register() {
                const user = body();

                // Send the user data to the server for registration
                fetch('/users/register', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(user)
                })
                    .then(response => response.json())
                    .then(() => {
                        return ok();
                    })
                    .catch(error => reject(error));
            }

            function getUsers() {
                // Retrieve the token from local storage
                const token = localStorage.getItem('token');
                // Send a GET request to the server to retrieve the users
                fetch('/users', {
                    method: 'GET',
                    headers: { 'Authorization': `Bearer ${token}` }
                })
                    .then(response => response.json())
                    .then(data => {
                        return ok(data);
                    })
                    .catch(error => reject(error));
            }

            function getUserById() {
                const token = localStorage.getItem('token');
                const userId = idFromUrl();
                // Send a GET request to the server to retrieve the user by ID
                fetch(`/users/${userId}`, {
                    method: 'GET',
                    headers: { 'Authorization': `Bearer ${token}` }
                })
                    .then(response => response.json())
                    .then(data => {
                        return ok(data);
                    })
                    .catch(error => reject(error));
            }

            function updateUser() {
                const token = localStorage.getItem('token');
                const userId = idFromUrl();
                const params = body();

                // Send the updated user data to the server for updating
                fetch(`/users/${userId}`, {
                    method: 'PUT',
                    headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
                    body: JSON.stringify(params)
                })
                    .then(response => response.json())
                    .then(() => {
                        return ok();
                    })
                    .catch(error => reject(error));
            }

            function deleteUser() {
                const token = localStorage.getItem('token');
                const userId = idFromUrl();

                // Send a DELETE request to the server to delete the user
                fetch(`/users/${userId}`, {
                    method: 'DELETE',
                    headers: { 'Authorization': `Bearer ${token}` }
                })
                    .then(() => {
                        return ok();
                    })
                    .catch(error => reject(error));
            }

            // helper functions

            function ok(body) {
                resolve({ ok: true, ...headers(), json: () => Promise.resolve(body) });
            }

            function unauthorized() {
                resolve({ status: 401, ...headers(), json: () => Promise.resolve({ message: 'Unauthorized' }) });
            }

            function error(message) {
                resolve({ status: 400, ...headers(), json: () => Promise.resolve({ message }) });
            }

            function basicDetails(user) {
                const { id, username, firstName, lastName } = user;
                return { id, username, firstName, lastName };
            }

            function isAuthenticated() {
                return opts.headers['Authorization'] === 'Bearer fake-jwt-token';
            }

            function body() {
                return opts.body && JSON.parse(opts.body);
            }

            function idFromUrl() {
                const urlParts = url.split('/');
                return parseInt(urlParts[urlParts.length - 1]);
            }

            function headers() {
                return {
                    headers: {
                        get(key) {
                            return ['application/json'];
                        }
                    }
                };
            }
        });
    };
}