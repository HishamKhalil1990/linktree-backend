const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const getAllUsers = async () => {
  const main = async () => {
    const allUsers = await prisma.users.findMany();
    if (allUsers) {
      return {
        status: "success",
        users: allUsers,
      };
    }
  };
  return main()
    .catch(async (e) => {
      return {
        status: "failed",
        msg: e.message,
      };
    })
    .finally(async () => {
      await prisma.$disconnect();
    });
};

const saveByPass = async (data) => {
  const main = async () => {
    await prisma.users.create({
      data: {
        username: data.username,
        email: data.email,
        password: data.password,
      },
    });
    return {
      status: "saved",
    };
  };
  return main()
    .catch(async (e) => {
      return {
        status: "failed",
        msg: "username or email is used",
      };
    })
    .finally(async () => {
      await prisma.$disconnect();
    });
};

const saveByPhone = async (data) => {
  const main = async () => {
    await prisma.users.create({
      data: {
        username: data.username,
        phoneNumber: data.phoneNumber,
      },
    });
    return {
      status: "saved",
    };
  };
  return main()
    .catch(async (e) => {
      return {
        status: "failed",
        msg: "username or phone number is used",
      };
    })
    .finally(async () => {
      await prisma.$disconnect();
    });
};

const activate = async (username) => {
  const main = async () => {
    await prisma.users.update({
      data: {
        activationStatus: "activated",
      },
      where: {
        username,
      },
    });
    return {
      status: "activated",
    };
  };
  return main()
    .catch(async (e) => {
      return {
        status: "failed",
      };
    })
    .finally(async () => {
      await prisma.$disconnect();
    });
};

const activateWithEmail = async (username, email) => {
  const main = async () => {
    await prisma.users.update({
      data: {
        email,
        activationStatus: "activated",
      },
      where: {
        username,
      },
    });
    return {
      status: "activated",
    };
  };
  return main()
    .catch(async (e) => {
      return {
        status: "failed",
        msg: "invalid email",
      };
    })
    .finally(async () => {
      await prisma.$disconnect();
    });
};

const getUserByPass = async (data) => {
  const main = async () => {
    const user = await prisma.users.findMany({
      where: {
        username: data.username,
        password: data.password,
      },
    });
    if (user.length > 0) {
      return {
        status: "success",
        users: user[0],
      };
    } else {
      return {
        status: "failed",
        msg: "invaild username or password",
      };
    }
  };
  return main()
    .catch(async (e) => {
      return {
        status: "failed",
      };
    })
    .finally(async () => {
      await prisma.$disconnect();
    });
};

const getUserByPhone = async (data) => {
  const main = async () => {
    const user = await prisma.users.findMany({
      where: {
        phoneNumber: data.phoneNumber,
      },
    });
    if (user.length > 0) {
      return {
        status: "success",
        users: user[0],
      };
    } else {
      return {
        status: "failed",
        msg: "invaild phone number",
      };
    }
  };
  return main()
    .catch(async (e) => {
      return {
        status: "failed",
      };
    })
    .finally(async () => {
      await prisma.$disconnect();
    });
};

module.exports = {
  getAllUsers,
  saveByPass,
  saveByPhone,
  activate,
  activateWithEmail,
  getUserByPass,
  getUserByPhone,
};
