const InvalidCredentialException = require("../../exceptions/invalid-credential-exception");
const UserRepository = require("../../repositories/user-repository");
const AuthService = require("../../services/auth-service");

class AuthController {
  async login(req, res) {
    const { email, password } = req.body;

    // const user = await User.findOne({
    //     where: {
    //         email
    //     }
    // })

    const user = await UserRepository.findByEmail(email);

    // if (!user)
    //     throw new InvalidCredentialException()

    if (!(await AuthService.isPasswordAMatch(password, user.password)))
      throw new InvalidCredentialException();

    const payload = {
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
    };
    // const key = require('crypto').randomBytes(64).toString('hex')

    const tokens = await AuthService.generateTokens(payload);

    res.send({ user, ...tokens });
  }

  async register(req, res) {
    const { firstName, lastName, email, password, roles, role } = req.body;
    const data = { firstName, lastName, email, password };

    const user = await UserRepository.create(data);
    console.log(user);
    if (roles) {
      console.log("role", role);
      await user.setRoles(role);
    }
    if (!roles) {
      console.log("test user");
      await user.setRoles([3]);
    }
    const userRoles = { roles: !roles ? "user" : roles };
    const { id } = user;
    const tokens = await AuthService.generateTokens({ id, ...data });
    // await user.setRefreshToken(tokens.refreshToken);

    res.send({ user, userRoles, ...tokens });
  }

  async refreshToken(req, res) {
    const { refreshToken } = req.body;
    const token = await AuthService.generateNewTokens(refreshToken);
    res.send(token);
  }
}

module.exports = new AuthController();
