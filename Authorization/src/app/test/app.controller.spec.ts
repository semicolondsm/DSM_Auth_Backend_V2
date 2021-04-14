import { Test, TestingModule } from "@nestjs/testing";
import { MockAppService } from "../../shared/mock/app.mock";
import { AppController } from "../app.controller";
import { AppService } from "../app.service";

describe("AppController", () => {
  let controller: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [
        {
          provide: AppService,
          useClass: MockAppService,
        },
      ],
    }).compile();

    controller = await app.resolve<AppController>(AppController);
  });
  it("should be defined", () => {
    expect(controller).toBeDefined();
  });

  describe("myService", () => {
    it("should be return consumer array", () => {
      controller.myService().then((res) => {
        expect(res).toBeInstanceOf(Array);
        expect(res[0].name).toEqual("ddyzd");
        expect(res[0].domain_url).toEqual("ddyzd.com");

        expect(res[1].name).toEqual("auth");
        expect(res[1].domain_url).toEqual("dsmauth.com");
      });
    });
  });
});
