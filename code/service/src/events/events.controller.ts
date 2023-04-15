import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  Post,
} from '@nestjs/common';
import { EventDTO } from 'src/dto/event.dto';
import { Keywords } from 'src/dto/keywords.dto';
import { UUID } from 'src/types';
import { EventsService } from './events.service';

const isIsoDate = (str) => {
  if (!/\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z/.test(str)) return false;
  const d = new Date(str);
  return d instanceof Date && d.toISOString() === str; // valid date
};

@Controller('events')
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @Post('createEvent')
  createEvent(@Body() event: EventDTO) {
    if (!isIsoDate(event.startDate) && !isIsoDate(event.endDate)) {
      throw new BadRequestException('Dates must be in UTC format');
    }

    const createdEvent = {
      eventId: UUID.random(),
      ...event,
    };

    this.eventsService.addEvent(createdEvent);

    return {
      message: 'Event created',
      eventId: createdEvent.eventId.toString(),
    };
  }

  @Get(':eventId')
  getEvent(@Param('eventId') eventId: string) {
    return this.eventsService.getEvent(UUID.fromString(eventId));
  }

  @Post(':eventId/addKeywords')
  addKeywords(@Param('eventId') eventId: string, @Body() keywords: Keywords) {
    this.eventsService.addKeywords(UUID.fromString(eventId), keywords.keywords);
  }
}
