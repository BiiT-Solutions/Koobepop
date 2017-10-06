import { AppointmentsProvider } from './appointments-provider';
import { StorageMock } from '../../../test-config/mocks-ionic';
import { AppointmentsRestService } from '../rest/appointments-rest-service';
import { TestBed, async, getTestBed } from '@angular/core/testing';
import { ServicesManager } from '../servicesManager';
import { AppointmentsRestServiceMock } from '../../../test-config/mocks-ionic';
import { AppointmentModel } from '../../models/appointment.model';
import { Storage } from '@ionic/storage';
describe('Service: AppointmentsProvider', () => {
  let service: AppointmentsProvider;
  let storage: Storage;
  //Phisical appointment
  const AP_PHYS_END = 0;
  const AP_PHYS_START = 0;
  const AP_PHYS_UPDATE = 0;
  const AP_PHYS_SPORT = 'Hockey';
  const AP_PHYS_EX_TYPE = 'Phys';
  const AP_PHYS_DOC_FNAME = 'Doctor';
  const AP_PHYS_DOC_LNAME = 'Horrible';
  const AP_PHYS_ID = 1;
  const AP_PHYS_RESULTS = [];
  const AP_PHYS_TYPE = 'Physical';

  //Phisical appointment 2
  const AP_PHYS_END_ACTUAL = 10;
  const AP_PHYS_START_ACTUAL = 10;
  const AP_PHYS_UPDATE_ACTUAL = 10;
  const AP_PHYS_SPORT_ACTUAL = 'Hockey';
  const AP_PHYS_EX_TYPE_ACTUAL = 'Phys';
  const AP_PHYS_DOC_FNAME_ACTUAL = 'Doctor';
  const AP_PHYS_DOC_LNAME_ACTUAL = 'Horrible';
  const AP_PHYS_ID_ACTUAL = 2;
  const AP_PHYS_RESULTS_ACTUAL = [];
  const AP_PHYS_TYPE_ACTUAL = 'Physical';


  //Mental appointment
  const AP_MENTAL_END = 0;
  const AP_MENTAL_START = 0;
  const AP_MENTAL_UPDATE = 0;
  const AP_MENTAL_SPORT = 'Hockey';
  const AP_MENTAL_EX_TYPE = 'Ment';
  const AP_MENTAL_DOC_FNAME = 'Doctor';
  const AP_MENTAL_DOC_LNAME = 'Even worse';
  const AP_MENTAL_ID = 3;
  const AP_MENTAL_RESULTS = [];
  const AP_MENTAL_TYPE = 'Mental';




  const PHYS_APPOINTMENT_PAST = newAppointment(
    AP_PHYS_END,
    AP_PHYS_START,
    AP_PHYS_UPDATE,
    AP_PHYS_SPORT,
    AP_PHYS_EX_TYPE,
    AP_PHYS_DOC_FNAME,
    AP_PHYS_DOC_LNAME,
    AP_PHYS_ID,
    AP_PHYS_RESULTS,
    AP_PHYS_TYPE,
  )
  const PHYS_APPOINTMENT_ACTUAL = newAppointment(
    AP_PHYS_END_ACTUAL,
    AP_PHYS_START_ACTUAL,
    AP_PHYS_UPDATE_ACTUAL,
    AP_PHYS_SPORT_ACTUAL,
    AP_PHYS_EX_TYPE_ACTUAL,
    AP_PHYS_DOC_FNAME_ACTUAL,
    AP_PHYS_DOC_LNAME_ACTUAL,
    AP_PHYS_ID_ACTUAL,
    AP_PHYS_RESULTS_ACTUAL,
    AP_PHYS_TYPE_ACTUAL,
  )
  const MENTAL_APPOINTMENT_1 = newAppointment(
    AP_MENTAL_END,
    AP_MENTAL_START,
    AP_MENTAL_UPDATE,
    AP_MENTAL_SPORT,
    AP_MENTAL_EX_TYPE,
    AP_MENTAL_DOC_FNAME,
    AP_MENTAL_DOC_LNAME,
    AP_MENTAL_ID,
    AP_MENTAL_RESULTS,
    AP_MENTAL_TYPE,
  )
  const APPOINTMENTS_TO_SAVE = [PHYS_APPOINTMENT_PAST, PHYS_APPOINTMENT_ACTUAL, MENTAL_APPOINTMENT_1];
  let SAVED_APPOINTMENTS;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [
        AppointmentsProvider,
        { provide: AppointmentsRestService, useClass: AppointmentsRestServiceMock },
        { provide: Storage, useClass: StorageMock }
      ]
    })
    const testbed = getTestBed();
    service = testbed.get(AppointmentsProvider)
    storage = testbed.get(Storage)
  }));

  it('should be created', () => {
    expect(service instanceof AppointmentsProvider).toBe(true);
  });

  it('should save appointments into the db', () => {
    spyOn(storage, 'set').and.callFake(function (key, value) {
      return Promise.resolve(value);
    });

    service.setAppointments(APPOINTMENTS_TO_SAVE).subscribe(savedAppointments => {
      expect(storage.set).toHaveBeenCalled();
      expect(savedAppointments.length).toBe(3);
      SAVED_APPOINTMENTS = savedAppointments;
    });
  })

  it('should retrieve appointments from the db', () => {
    spyOn(storage, 'get').and.returnValue(Promise.resolve(SAVED_APPOINTMENTS));
    service.getAppointments().subscribe(retrievedAppointments => {
      expect(storage.get).toHaveBeenCalled();
      expect(retrievedAppointments.length).toBe(3);
      expect(retrievedAppointments).toBe(APPOINTMENTS_TO_SAVE)
    });
  })

  it('should get the last appointment of each type', () => {

    spyOn(storage, 'get').and.returnValue(Promise.resolve(SAVED_APPOINTMENTS));
    service.getLastAppointmentsByType().subscribe(retrievedAppointments => {
      expect(storage.get).toHaveBeenCalled();
      expect(retrievedAppointments.length).toBe(2);
      const appointmentsIDs = retrievedAppointments.map(appointment=>appointment.appointmentId)
      expect(appointmentsIDs.indexOf(AP_MENTAL_ID)).toBeGreaterThanOrEqual(0)
      expect(appointmentsIDs.indexOf(AP_PHYS_ID_ACTUAL)).toBeGreaterThanOrEqual(0)
      expect(appointmentsIDs.indexOf(AP_PHYS_ID)).not.toBeGreaterThanOrEqual(0)
    });
  });

  it('should update the appointments using the REST api');

  function newAppointment(
    endTime: number,
    startTime: number,
    updateTime: number,
    sport: string,
    examinationType: string,
    doctorFirstName: string,
    doctorLastName: string,
    appointmentId: number,
    results: any[],
    type: string,
  ): AppointmentModel {
    const appointment = new AppointmentModel();
    appointment.endTime = endTime;
    appointment.startTime = startTime;
    appointment.updateTime = updateTime;
    appointment.sport = sport;
    appointment.examinationType = examinationType;
    appointment.doctorFirstName = doctorFirstName;
    appointment.doctorLastName = doctorLastName;
    appointment.appointmentId = appointmentId;
    appointment.results = results;
    appointment.type = type;
    return appointment
  }

});
