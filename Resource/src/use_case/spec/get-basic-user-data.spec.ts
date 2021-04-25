import { User } from "../../domain/user/user";
import { UserRepository } from "../../domain/user/user.repository";
import { GetBasicUserData } from "../get-basic-user-data";

describe("use_case/GetBasicUserData", () => {
  const user: User = new User({
    name: "tester",
    email: "tester@gmail.com",
    gcn: "0000",
  });
  let getBasicUserData: GetBasicUserData;
  let mockUserRepository: UserRepository;

  beforeAll(() => {
    mockUserRepository = {} as UserRepository;
    mockUserRepository.findOne = async (identity: string): Promise<User> => {
      if (identity === "tester_identity") {
        return user;
      }
    };

    getBasicUserData = new GetBasicUserData(mockUserRepository);
  });

  describe("execute()", () => {
    it("should return user data from repositroy", () => {
      expect(getBasicUserData.execute("tester_identity")).resolves.toEqual(
        user,
      );
    });

    it("should return undefined from repository", () => {
      expect(getBasicUserData.execute("zalgo")).resolves.toBeUndefined();
    });
  });
});
