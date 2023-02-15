import type { Request } from '@remix-run/node';
import { redirect } from '@remix-run/node';
import { createCookieSessionStorage } from '@remix-run/node';

const sessionSecret = process.env.SESSION_SECRET;

if (!sessionSecret) {
	throw new Error('SESSION_SECRET must be set');
}

const storage = createCookieSessionStorage({
	cookie: {
		name: 'Blackmarket_Session',
		secrets: [sessionSecret],
		maxAge: 60 * 60 * 24 * 30,
	},
});

export const getUserSession = (request: Request) => {
	return storage.getSession(request.headers.get('Cookie'));
};

export const createUserSession = async (access_token: string, redirectTo: string) => {
	const session = await storage.getSession();
	session.set('access_token', access_token);

	return redirect(redirectTo, {
		headers: {
			'Set-Cookie': await storage.commitSession(session),
		},
	});
};
