import { Test, TestingModule } from "@nestjs/testing";
import { DsmauthController } from "./dsmauth.controller";

describe("DsmauthController", () => {
  let controller: DsmauthController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DsmauthController],
    }).compile();

    controller = module.get<DsmauthController>(DsmauthController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });
});
