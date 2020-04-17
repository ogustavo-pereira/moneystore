const ptBR = {
	login: 'Área de Login',
	email: 'E-mail',
	register: 'Registrar',
	username: 'Nome do Usuário',
	password: 'Senha',
	next: 'Avançar',
	fieldempty: 'Este campo não pode ficar vazio',
	email_already_registered: 'E-mail já cadastrado',
	unexpected_error: 'Ocorreu um erro inesperado',
	user_not_found: 'Usuário não encontrado',
	password_error: 'Senha invalida',
};

const enUS = {
	login: 'Login',
	email: 'E-mail',
	register: 'Register',
	username: 'Username',
	password: 'Password',
	next: 'Next',
	fieldempty: 'This field cannot be empty',
	email_already_registered: 'E-mail already registered',
	unexpected_error: 'An unexpected error has occurred',
	user_not_found: 'User not found',
	password_error: 'Invalid Password',
};

const lang = navigator.language === 'pt-BR' ? ptBR : enUS;

export default { ...lang };
