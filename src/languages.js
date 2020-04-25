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
	logo: 'Money Store',
	help: 'Ajuda',
	tradearea: 'Área de Troca',
	view_more: 'Exibir Mais',
	your_wallet: 'Sua Carteira',
	money_avaible: 'Dinheiro Disponível',
	your_coins: 'Suas Moedas',
	total_invested: 'Total Investido',
	latest_operations: 'Últimas operações',
	see_complete_extract: 'Ver Extrato Completo',
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
	logo: 'Money Store',
	help: 'Help',
	myaccount: 'My Account',
	tradearea: 'Trade Area',
	view_more: 'View More',
	your_wallet: 'Your Wallet',
	money_avaible: 'Money Avaible',
	your_coins: 'Your Coins',
	total_invested: 'Total Invested',
	latest_operations: 'Latest operations',
	see_complete_extract: 'See Complete Extract',

};

const lang = navigator.language === 'pt-BR' ? ptBR : enUS;

export default { ...lang };
