import { EntityRepository, Repository } from "typeorm";
import { Redirect } from "./redirect.entity";

@EntityRepository(Redirect)
export class RedirectRepository extends Repository<Redirect> {}
