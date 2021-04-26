import { ArgumentsHost, HttpStatus } from "@nestjs/common";
import { UnauthorizedTokenException } from "../../../../domain/unauthorized-token.error";
import { HttpExceptionFilter } from "../http-exception.filter";

describe("infrastructure/rest/filter/HttpExceptionFilter", () => {
  let httpExceptionFilter: HttpExceptionFilter;
  let mockArgumentHost: ArgumentsHost;
  let mockStatus: jest.Mock;
  let mockJson: jest.Mock;

  beforeEach(() => {
    mockStatus = jest.fn();
    mockJson = jest.fn();

    mockStatus.mockImplementation(() => ({
      json: mockJson,
    }));

    mockArgumentHost = {
      switchToHttp: () => ({
        getResponse: () => ({
          status: mockStatus,
        }),
      }),
    } as ArgumentsHost;

    httpExceptionFilter = new HttpExceptionFilter();
  });

  describe("catch()", () => {
    it("should call response status method with unauthorized status code", () => {
      httpExceptionFilter.catch(UnauthorizedTokenException, mockArgumentHost);
      const expected: number = HttpStatus.UNAUTHORIZED;
      expect(mockStatus).toHaveBeenCalledWith(expected);
    });

    it("should call response json method with response body", () => {
      const fixedDate: Date = new Date("2004-11-18T04:43:00");
      // @ts-ignore
      jest.spyOn(global, "Date").mockImplementationOnce(() => fixedDate);

      const expected: object = {
        statusCode: HttpStatus.UNAUTHORIZED,
        timestamp: fixedDate.toISOString(),
        name: UnauthorizedTokenException.name,
        message: UnauthorizedTokenException.message,
      };

      httpExceptionFilter.catch(UnauthorizedTokenException, mockArgumentHost);
      expect(mockJson).toHaveBeenCalledWith(expected);
    });
  });
});
