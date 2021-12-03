// import {
//   Repository,
//   EntityRepository,
//   EntityManager,
//   TransactionManager,
// } from 'typeorm';
// import { Users } from '../entities/Users';
// import { HttpException, Injectable } from '@nestjs/common';
//
// @EntityRepository(Users)
// export class UserRepository extends Repository<Users> {
//   /**
//    * 유저 정보 조회
//    * @param transactionManager
//    * @param social_id
//    */
//   async findBySocialId(
//     @TransactionManager() transactionManager: EntityManager,
//     id: string,
//   ) {
//     try {
//       return await transactionManager.findOne(Users, { where: { ss: id } });
//     } catch (err) {
//       throw err;
//     }
//   }
// }
