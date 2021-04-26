import { User } from "../../../domain/user/user";

describe("domain/User", () => {
  describe("constructor", () => {
    it("should bind value", () => {
      const name: string = "tester";
      const email: string = "tester@gmail.com";
      const gcn: string = "0000";

      const result: User = new User({ name, email, gcn });

      expect(result.name).toEqual(name);
      expect(result.email).toEqual(email);
      expect(result.gcn).toEqual(gcn);
    });
  });
});
