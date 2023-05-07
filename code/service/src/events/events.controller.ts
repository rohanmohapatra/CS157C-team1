import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  Post,
  UseGuards,
  Request,
} from '@nestjs/common';
import { EventDTO } from 'dto/event.dto';
import { Keywords } from 'dto/keywords.dto';
import { UUID } from 'types';
import { EventsService } from './events.service';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'auth/auth.guard';

const isIsoDate = (str) => {
  if (!/\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z/.test(str)) return false;
  const d = new Date(str);
  return d instanceof Date && d.toISOString() === str; // valid date
};

@ApiTags('events')
@Controller('events')
@UseGuards(AuthGuard)
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @Post('createEvent')
  createEvent(@Request() request) {
    const eventDto: EventDTO = request.body;
    if (!isIsoDate(eventDto.startDate) && !isIsoDate(eventDto.endDate)) {
      throw new BadRequestException('Dates must be in UTC format');
    }

    const createdEvent = {
      eventId: UUID.random(),
      ...eventDto,
      email: request.user.email,
    };

    this.eventsService.addEvent(createdEvent);

    return {
      message: 'Event created',
      eventId: createdEvent.eventId.toString(),
    };
  }

  @Get('/')
  getEvents(@Request() request) {
    return this.eventsService.getEvents(request.user.email);
  }

  @Get(':eventId')
  getEvent(@Param('eventId') eventId: string, @Request() request) {
    return this.eventsService.getEvent(
      UUID.fromString(eventId),
      request.user.email,
    );
  }

  @Post(':eventId/addKeywords')
  addKeywords(
    @Param('eventId') eventId: string,
    @Body() keywords: Keywords,
    @Request() request,
  ) {
    this.eventsService.addKeywords(
      UUID.fromString(eventId),
      request.user.email,
      keywords.keywords,
    );
  }

  @Post(':eventId/createMeeting')
  createMeeting(@Param('eventId') eventId: string, @Request() request) {}
}
