const Login = () => {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault();

        console.log("teste", username, password);

        console.log("Envio");
    }
};

function login(event) {
    event.preventDefault();

    const userInput = document.getElementById('user').value;
    const passwordInput = document.getElementById('password').value;
    const msgError = document.getElementById('mensagemErro');

    msgError.textContent = '';

    if (userInput === USUARIO_CORRETO && passwordInput === SENHA_CORRETA) {
        alert('Bem vindo');
        window.location.href = 'src/quadro.html';
    } else {
        msgError.textContent = 'Usuario ou senha incorretos.';
    }
}

const form = document.getElementById('loginForm');
form.addEventListener('submit', login);
