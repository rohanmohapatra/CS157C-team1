import { Injectable, OnModuleInit } from '@nestjs/common';
import { mapping } from 'cassandra-driver';
import { CassandraService } from 'src/cassandra/cassandra.service';
import { Event } from 'src/models/Event';
import { UUID } from 'src/types';

@Injectable()
export class EventsRepository implements OnModuleInit {
  constructor(private readonly cassandraService: CassandraService) {}

  private eventMapper: mapping.ModelMapper<Event>;

  onModuleInit() {
    const mappingOptions: mapping.MappingOptions = {
      models: {
        Event: {
          tables: ['events'],
          mappings: new mapping.UnderscoreCqlToCamelCaseMappings(),
        },
      },
    };
    this.eventMapper = this.cassandraService
      .createMapper(mappingOptions)
      .forModel('Event');
  }

  async getEvent(eventId: UUID) {
    return await (await this.eventMapper.find({ eventId })).first();
  }

  async addEvent(event: Event) {
    return await this.eventMapper.insert(event);
  }
}
