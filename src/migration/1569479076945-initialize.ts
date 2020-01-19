import { getRepository, MigrationInterface, QueryRunner } from 'typeorm';
// import { Role } from '../entity/Role';
// import { UsersCompanies } from '../entity/UsersCompanies';
import toHash from '../utils/to_hash';

export class Initialize1569479076945 implements MigrationInterface {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any,@typescript-eslint/no-unused-vars
  public async up(queryRunner: QueryRunner): Promise<any> {
    // const roleRepository = getRepository(Role);
    // const admin = new Role({ role: 'ADMIN' });
    // const normal = new Role({ role: 'NORMAL' });
    // await roleRepository.save(admin);
    // await roleRepository.save(normal);
    // const user = new UsersCompanies();

    // userCompaniesId: '',
    // updatedAt: '',
    // createdAt: '',
    // remark: '',
    // avatar: '',
    // hashAt: '',
    // hash: '',
    // activate: '',
    // rolesId: '',
    // degreesId: '',
    // status: '',
    // divisionsId: '',
    // groupsId: '',
    // email: '',
    // userName: 'kkiyama',
    // password: toHash('pass'),
    // roles: [admin],

    // const userRepository = getRepository(UsersCompanies);
    // await userRepository.save(user);
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars,@typescript-eslint/no-explicit-any
  public async down(queryRunner: QueryRunner): Promise<any> {
    // const userRepository = getRepository(UsersCompanies);
    // await userRepository.clear();
    // const roleRepository = getRepository(Role);
    // await roleRepository.clear();
  }
}
