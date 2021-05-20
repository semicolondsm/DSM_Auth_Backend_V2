import { Test, TestingModule } from "@nestjs/testing";
import { notFoundConsumerException } from "../../shared/exception/exception.index";
import { MockConsumerService } from "../../shared/mock/consumer.mock";
import { ConsumerController } from "../consumer.controller";
import { ConsumerService } from "../consumer.service";

describe("ConsumerController", () => {
  let controller: ConsumerController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: ConsumerService,
          useClass: MockConsumerService,
        },
      ],
      controllers: [ConsumerController],
    }).compile();

    controller = module.get<ConsumerController>(ConsumerController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });

  describe("registration", () => {
    const dto = {
      consumer: "testSite",
      domain_url: "test.com",
      redirect_url: "test123.com",
    };
    it("should be return client_id, client_secret", () => {
      controller.registration(dto).then((res) => {
        expect(res).toBeInstanceOf(Object);
        expect(res.client_id).toEqual("testuuid");
        expect(res.client_secret).toEqual("testuuid");
      });
    });
  });

  describe("list", () => {
    it("should be return consumer array", () => {
      controller.list().then((res) => {
        expect(res).toBeInstanceOf(Array);
        expect(res[0].name).toEqual("naver");
        expect(res[0].domain_url).toEqual("naver.com");

        expect(res[1].name).toEqual("google");
        expect(res[1].domain_url).toEqual("google.com");
      });
    });
  });

  describe("url", () => {
    const dto = {
      client_id: "testuuid",
      redirect_url: "test123.com",
    };

    it("should be success", () => {
      controller.addConsumerRedirectUrl(dto).then((res) => {
        expect(res).toBeInstanceOf(Object);
        expect(res.message).toBe("success");
      });
    });

    it("should be throw notFoundConsumer error", () => {
      controller
        .addConsumerRedirectUrl({ ...dto, client_id: "errorpls" })
        .catch((err) => {
          expect(err).toEqual(notFoundConsumerException);
        });
    });
  });
});
