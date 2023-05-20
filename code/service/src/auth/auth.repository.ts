import { Injectable, OnModuleInit } from '@nestjs/common';
import { mapping } from 'cassandra-driver';
import { CassandraService } from 'cassandra/cassandra.service';
import * as bcrypt from 'bcrypt';
import { AuthInterface } from './auth.interface';
import { Auth } from 'models/Auth';

@Injectable()
export class AuthRepository implements OnModuleInit, AuthInterface {
  constructor(private readonly cassandraService: CassandraService) {}

  private authMapper: mapping.ModelMapper<Auth>;
  private saltRounds: number;

  onModuleInit() {
    const mappingOptions: mapping.MappingOptions = {
      models: {
        Auth: {
          tables: ['auth'],
          mappings: new mapping.UnderscoreCqlToCamelCaseMappings(),
        },
      },
    };
    this.saltRounds = 10;
    this.authMapper = this.cassandraService
      .createMapper(mappingOptions)
      .forModel('Auth');
  }

  private async createOldPasswordColumn() {
    const query = 'ALTER TABLE auth ADD old_password text;';
    try {
      const response = await this.cassandraService.client.execute(query);
      return response.wasApplied();
    } catch (error) {
      // no op
    }
  }

  async login(email: string, password: string) {
    const user = (await this.authMapper.find({ email })).first();
    if (!user) {
      return false;
    }
    const isLoginSuccessful = await bcrypt.compare(password, user.password);
    return isLoginSuccessful;
  }

  async signUp(email: string, password: string) {
    const user = (await this.authMapper.find({ email })).first();
    if (user) {
      return false;
    }
    const passwordHash = await bcrypt.hash(password, this.saltRounds);
    const response = await this.authMapper.insert({
      email,
      password: passwordHash,
    });
    return response.wasApplied;
  }

  async changePassword(email: string, password: string, oldPassword: string) {
    const user = (await this.authMapper.find({ email })).first();
    if (!user) {
      return false;
    }
    const isOldPasswordCorrect = await bcrypt.compare(
      oldPassword,
      user.password,
    );

    if (!isOldPasswordCorrect) {
      return false;
    }

    // TODO: verify if new password not equal to old password

    await this.createOldPasswordColumn();

    const passwordHash = await bcrypt.hash(password, this.saltRounds);
    const response = await this.authMapper.update({
      email,
      password: passwordHash,
      oldPassword: user.password,
    });
    return response.wasApplied;
  }
}
