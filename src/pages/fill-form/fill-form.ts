import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';


@Component({
  selector: 'page-fill-form',
  templateUrl: 'fill-form.html',
})
export class FillFormPage {
 @ViewChild('formRunner') formRunner;

private form:Observable<any>;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.form = Observable.of(this.getForm());
  }

  ionViewDidLoad() {
  }

  public manageFormResponse(response){
    // TODO - Send response(?)
    // Pop page
    this.navCtrl.pop();
  }

  public previousPage(){
    this.formRunner.previousPage()
  }

  public nextPage(){
    this.formRunner.nextPage()
  }

  public submitForm(){
    this.formRunner.submitForm()
  }

  
  getForm(){
    return {
      "class": "com.biit.webforms.persistence.entity.CompleteFormView",
      "comparationId": "3a806440-ba25-4208-b39b-70eec40c65a1",
      "creationTime": "Jan 3, 2018 2:54:00 PM",
      "updateTime": "Jan 3, 2018 2:54:00 PM",
      "name": "form",
      "label": "USMO Anamnese",
      "hidden": false,
      "children": [
        {
          "class": "com.biit.webforms.persistence.entity.Category",
          "comparationId": "8a884058-ddec-4858-b074-751b7820d5b6",
          "creationTime": "Mar 30, 2015 5:00:29 PM",
          "updateTime": "Jul 3, 2017 9:53:10 AM",
          "createdBy": 10436,
          "updatedBy": 10436,
          "name": "Reason",
          "label": "Reden aanmelding",
          "hidden": false,
          "children": [
            {
              "class": "com.biit.webforms.persistence.entity.SystemField",
              "comparationId": "52334b58-504b-4108-a026-c7b0fb5405cf",
              "creationTime": "Apr 23, 2015 12:41:46 PM",
              "updateTime": "Jul 3, 2017 9:43:55 AM",
              "createdBy": 10436,
              "updatedBy": 10436,
              "name": "organization",
              "label": "\u003cnull\u003e",
              "hidden": false,
              "children": [],
              "fieldName": "null"
            },
            {
              "class": "com.biit.webforms.persistence.entity.SystemField",
              "comparationId": "a97f9aa5-c6ff-4cd7-adb7-395e0c295814",
              "creationTime": "Apr 1, 2016 9:30:43 AM",
              "updateTime": "Jul 3, 2017 9:43:56 AM",
              "createdBy": 10436,
              "updatedBy": 10436,
              "name": "appointment",
              "label": "\u003cnull\u003e",
              "hidden": false,
              "children": [],
              "fieldName": "null"
            },
            {
              "class": "com.biit.webforms.persistence.entity.Text",
              "comparationId": "e18f3ce3-aec2-4246-ac91-9d3dd8c801b9",
              "creationTime": "Mar 30, 2015 4:49:18 PM",
              "updateTime": "Jul 3, 2017 9:43:58 AM",
              "createdBy": 10436,
              "updatedBy": 10436,
              "name": "info_1",
              "label": "Voordat u het sportmedisch ond...",
              "hidden": false,
              "children": [],
              "description": "Voordat u het sportmedisch onderzoek ondergaat, verzoeken we u graag om alvast enkele gegevens aangaande uzelf en de reden voor het sportmedisch onderzoek aan te leveren. Dit kan doormiddel van het invullen van onderstaande vragen.\n\nNa afloop van het invullen van dit formulier nemen wij zo spoedig mogelijk contact met u op voor het maken van een afspraak.\n\nAntwoorden op de vragen zijn alleen zichtbaar voor de sportarts en zullen verder niet met derden worden gedeeld."
            },
            {
              "class": "com.biit.webforms.persistence.entity.Question",
              "comparationId": "9e58f3f5-791a-49e1-9fd8-72fa1c0aa048",
              "creationTime": "Mar 30, 2015 5:01:33 PM",
              "updateTime": "Jul 3, 2017 9:43:59 AM",
              "createdBy": 10436,
              "updatedBy": 10436,
              "name": "reason",
              "label": "Reden",
              "hidden": false,
              "children": [
                {
                  "class": "com.biit.webforms.persistence.entity.Answer",
                  "comparationId": "6d21cacf-8d9e-4ec8-903b-c7933aa9775f",
                  "creationTime": "Mar 30, 2015 5:04:27 PM",
                  "updateTime": "Mar 24, 2016 11:51:58 AM",
                  "createdBy": 10436,
                  "updatedBy": 10436,
                  "name": "sport",
                  "label": "(intensief) Sporten",
                  "hidden": false,
                  "children": [],
                  "description": "Je bent reeds (intensief) aan het sporten of wilt (intensief) gaan sporten en wilt graag een sportmedisch onderzoek ondergaan"
                },
                {
                  "class": "com.biit.webforms.persistence.entity.Answer",
                  "comparationId": "51bc64bc-1541-4443-8ad1-f9c5a1e24102",
                  "creationTime": "Mar 30, 2015 5:04:29 PM",
                  "updateTime": "Mar 24, 2016 11:51:58 AM",
                  "createdBy": 10436,
                  "updatedBy": 10436,
                  "name": "screening_examinations",
                  "label": "(verplichte) Sportkeuring",
                  "hidden": false,
                  "children": [],
                  "description": ""
                },
                {
                  "class": "com.biit.webforms.persistence.entity.Answer",
                  "comparationId": "bf245ab0-c891-4199-a96b-7821b49c5d40",
                  "creationTime": "Mar 24, 2016 11:32:45 AM",
                  "updateTime": "Mar 24, 2016 11:51:59 AM",
                  "createdBy": 10436,
                  "updatedBy": 10436,
                  "name": "cios",
                  "label": "CIOS",
                  "hidden": false,
                  "children": [],
                  "description": ""
                },
                {
                  "class": "com.biit.webforms.persistence.entity.Answer",
                  "comparationId": "0c0898b6-43b2-4381-90dd-aa49109f6be7",
                  "creationTime": "Mar 24, 2016 11:32:56 AM",
                  "updateTime": "Mar 24, 2016 11:52:00 AM",
                  "createdBy": 10436,
                  "updatedBy": 10436,
                  "name": "veva",
                  "label": "VeVa",
                  "hidden": false,
                  "children": [],
                  "description": ""
                },
                {
                  "class": "com.biit.webforms.persistence.entity.Answer",
                  "comparationId": "8200a91f-ff58-4e69-b990-f47abb8d4839",
                  "creationTime": "Mar 30, 2015 5:04:30 PM",
                  "updateTime": "Mar 24, 2016 11:52:58 AM",
                  "createdBy": 10436,
                  "updatedBy": 10436,
                  "name": "others",
                  "label": "Anders",
                  "hidden": false,
                  "children": [],
                  "description": ""
                }
              ],
              "answerType": "SINGLE_SELECTION_RADIO",
              "mandatory": true,
              "horizontal": false,
              "description": ""
            },
            {
              "class": "com.biit.webforms.persistence.entity.Question",
              "comparationId": "178f065a-3541-42d5-b1d2-30dc4774027f",
              "creationTime": "Mar 30, 2015 5:01:34 PM",
              "updateTime": "Jul 3, 2017 9:43:59 AM",
              "createdBy": 10436,
              "updatedBy": 10436,
              "name": "reason_extra",
              "label": "Omschrijving van de reden",
              "hidden": false,
              "children": [],
              "answerType": "TEXT_AREA",
              "mandatory": true,
              "horizontal": false,
              "description": ""
            },
            {
              "class": "com.biit.webforms.persistence.entity.Question",
              "comparationId": "ad4c9410-2db8-4abf-9846-80d12ba002b4",
              "creationTime": "Mar 30, 2015 5:01:58 PM",
              "updateTime": "Jul 3, 2017 9:44:00 AM",
              "createdBy": 10436,
              "updatedBy": 10436,
              "name": "screening_examinations",
              "label": "(verplichte) Sportkeuring voor:",
              "hidden": false,
              "children": [
                {
                  "class": "com.biit.webforms.persistence.entity.Answer",
                  "comparationId": "97e02f89-20d0-4bb7-9e2a-f65cd8143b87",
                  "creationTime": "Mar 30, 2015 5:13:34 PM",
                  "updateTime": "Mar 22, 2016 12:11:49 PM",
                  "createdBy": 10436,
                  "updatedBy": 10436,
                  "name": "auto_sport",
                  "label": "Autosport (KNAF)",
                  "hidden": false,
                  "children": [],
                  "description": ""
                },
                {
                  "class": "com.biit.webforms.persistence.entity.Answer",
                  "comparationId": "d3f5f2c3-cacc-4031-804d-6c6eaebaf7c0",
                  "creationTime": "Mar 30, 2015 5:13:35 PM",
                  "updateTime": "Mar 22, 2016 12:11:49 PM",
                  "createdBy": 10436,
                  "updatedBy": 10436,
                  "name": "boxing",
                  "label": "Boksen",
                  "hidden": false,
                  "children": [],
                  "description": ""
                },
                {
                  "class": "com.biit.webforms.persistence.entity.Answer",
                  "comparationId": "ce77d15c-7fb5-40e9-8172-a4249953523b",
                  "creationTime": "Mar 30, 2015 5:13:36 PM",
                  "updateTime": "Mar 22, 2016 12:11:49 PM",
                  "createdBy": 10436,
                  "updatedBy": 10436,
                  "name": "motor_sport",
                  "label": "Motorsport",
                  "hidden": false,
                  "children": [],
                  "description": ""
                },
                {
                  "class": "com.biit.webforms.persistence.entity.Answer",
                  "comparationId": "5a7c13bc-c0ac-46e0-829a-ad134c569fe4",
                  "creationTime": "Mar 30, 2015 5:13:36 PM",
                  "updateTime": "Mar 22, 2016 12:11:49 PM",
                  "createdBy": 10436,
                  "updatedBy": 10436,
                  "name": "parachuting",
                  "label": "Parachutespringen",
                  "hidden": false,
                  "children": [],
                  "description": ""
                },
                {
                  "class": "com.biit.webforms.persistence.entity.Answer",
                  "comparationId": "379d0b59-2f40-465a-97df-e55e4fe0155f",
                  "creationTime": "Mar 30, 2015 5:13:37 PM",
                  "updateTime": "Mar 22, 2016 12:11:49 PM",
                  "createdBy": 10436,
                  "updatedBy": 10436,
                  "name": "diving",
                  "label": "Sportduiken",
                  "hidden": false,
                  "children": [],
                  "description": ""
                },
                {
                  "class": "com.biit.webforms.persistence.entity.Answer",
                  "comparationId": "dd3f369e-7a32-4e13-847e-08b048192bec",
                  "creationTime": "Mar 31, 2015 1:02:06 PM",
                  "updateTime": "Mar 22, 2016 12:11:49 PM",
                  "createdBy": 10436,
                  "updatedBy": 10436,
                  "name": "triathlon",
                  "label": "Triathlon",
                  "hidden": false,
                  "children": [],
                  "description": ""
                },
                {
                  "class": "com.biit.webforms.persistence.entity.Answer",
                  "comparationId": "7727a6e1-3093-40d1-a25a-3539344c97fb",
                  "creationTime": "Mar 30, 2015 5:13:38 PM",
                  "updateTime": "Mar 24, 2016 11:37:57 AM",
                  "createdBy": 10436,
                  "updatedBy": 10436,
                  "name": "cycling",
                  "label": "Wielrennen (KNWU)",
                  "hidden": false,
                  "children": [],
                  "description": ""
                },
                {
                  "class": "com.biit.webforms.persistence.entity.Answer",
                  "comparationId": "42b738e1-b83a-41d7-bcbe-0d6961191605",
                  "creationTime": "Mar 30, 2015 5:38:39 PM",
                  "updateTime": "Mar 22, 2016 12:11:49 PM",
                  "createdBy": 10436,
                  "updatedBy": 10436,
                  "name": "others",
                  "label": "Anders",
                  "hidden": false,
                  "children": [],
                  "description": ""
                }
              ],
              "answerType": "SINGLE_SELECTION_RADIO",
              "mandatory": true,
              "horizontal": false,
              "description": ""
            }
          ]
        },
        {
          "class": "com.biit.webforms.persistence.entity.Category",
          "comparationId": "5bcb30c8-b10b-45a6-8056-720aa82d9ef6",
          "creationTime": "Mar 5, 2015 11:23:35 AM",
          "updateTime": "Jul 3, 2017 9:42:56 AM",
          "createdBy": 10436,
          "updatedBy": 10436,
          "name": "PersonalDetails",
          "label": "Persoonlijke gegevens",
          "hidden": false,
          "children": [
            {
              "class": "com.biit.webforms.persistence.entity.Question",
              "comparationId": "b4c1059a-e546-4d7b-856e-6443a58537bd",
              "creationTime": "Mar 5, 2015 11:26:31 AM",
              "updateTime": "May 20, 2016 7:10:04 PM",
              "createdBy": 10436,
              "updatedBy": 10436,
              "name": "profile_first_name",
              "label": "Voornaam",
              "hidden": false,
              "children": [],
              "answerType": "INPUT",
              "answerFormat": "TEXT",
              "answerSubformat": "TEXT",
              "mandatory": false,
              "horizontal": false,
              "description": ""
            },
            {
              "class": "com.biit.webforms.persistence.entity.Question",
              "comparationId": "2f09d657-e301-492c-beb9-4f48dad5b171",
              "creationTime": "Jan 27, 2016 12:46:35 PM",
              "updateTime": "May 16, 2016 9:52:25 AM",
              "createdBy": 10436,
              "updatedBy": 10436,
              "name": "profile_initials",
              "label": "Initialen",
              "hidden": false,
              "children": [],
              "answerType": "INPUT",
              "answerFormat": "TEXT",
              "answerSubformat": "TEXT",
              "mandatory": true,
              "horizontal": false,
              "description": ""
            },
            {
              "class": "com.biit.webforms.persistence.entity.Question",
              "comparationId": "c5feeb74-21ff-4964-a3c4-563190f50351",
              "creationTime": "Mar 5, 2015 11:26:31 AM",
              "updateTime": "May 16, 2016 9:52:27 AM",
              "createdBy": 10436,
              "updatedBy": 10436,
              "name": "profile_last_name",
              "label": "Achternaam",
              "hidden": false,
              "children": [],
              "answerType": "INPUT",
              "answerFormat": "TEXT",
              "answerSubformat": "TEXT",
              "mandatory": true,
              "horizontal": false,
              "description": ""
            },
            {
              "class": "com.biit.webforms.persistence.entity.Question",
              "comparationId": "4f481cbd-204b-49d4-ba89-6436c60b76d3",
              "creationTime": "Mar 5, 2015 11:26:40 AM",
              "updateTime": "May 20, 2016 7:10:06 PM",
              "createdBy": 10436,
              "updatedBy": 10436,
              "name": "profile_gender",
              "label": "Geslacht",
              "hidden": false,
              "children": [
                {
                  "class": "com.biit.webforms.persistence.entity.Answer",
                  "comparationId": "5e9570e1-b1ea-4d42-9c6b-3b577a34b4e7",
                  "creationTime": "Mar 5, 2015 11:29:49 AM",
                  "updateTime": "Mar 6, 2015 12:39:31 PM",
                  "createdBy": 10436,
                  "updatedBy": 10436,
                  "name": "male",
                  "label": "Man",
                  "hidden": false,
                  "children": [],
                  "description": ""
                },
                {
                  "class": "com.biit.webforms.persistence.entity.Answer",
                  "comparationId": "30f990b5-04e8-45e1-8e9e-4c30f3e291ad",
                  "creationTime": "Mar 5, 2015 11:29:49 AM",
                  "updateTime": "Mar 6, 2015 12:39:34 PM",
                  "createdBy": 10436,
                  "updatedBy": 10436,
                  "name": "female",
                  "label": "Vrouw",
                  "hidden": false,
                  "children": [],
                  "description": ""
                }
              ],
              "answerType": "SINGLE_SELECTION_RADIO",
              "mandatory": true,
              "horizontal": false,
              "description": ""
            },
            {
              "class": "com.biit.webforms.persistence.entity.Question",
              "comparationId": "e76b109f-9545-4e16-987c-58dc343227a0",
              "creationTime": "Mar 5, 2015 11:26:33 AM",
              "updateTime": "May 16, 2016 9:52:32 AM",
              "createdBy": 10436,
              "updatedBy": 10436,
              "name": "profile_birthday",
              "label": "Geboortedatum",
              "hidden": false,
              "children": [],
              "answerType": "INPUT",
              "answerFormat": "DATE",
              "answerSubformat": "DATE_PAST",
              "mandatory": true,
              "horizontal": false,
              "description": "Formaat dd-mm-jjjj (bv. 18-04-1980)"
            },
            {
              "class": "com.biit.webforms.persistence.entity.Question",
              "comparationId": "5ab11dad-0be2-4b40-a69e-343bbe075289",
              "creationTime": "Jun 2, 2015 12:05:39 PM",
              "updateTime": "May 16, 2016 9:52:36 AM",
              "createdBy": 10436,
              "updatedBy": 10436,
              "name": "person_bsn",
              "label": "Burger Service Nummer (BSN) / ID Nummer",
              "hidden": false,
              "children": [],
              "answerType": "INPUT",
              "answerFormat": "TEXT",
              "answerSubformat": "TEXT",
              "mandatory": true,
              "horizontal": false,
              "description": ""
            },
            {
              "class": "com.biit.webforms.persistence.entity.Question",
              "comparationId": "630bbf6f-4c4f-400d-9dcf-e3d09312094e",
              "creationTime": "Jun 2, 2015 12:05:58 PM",
              "updateTime": "May 16, 2016 9:52:37 AM",
              "createdBy": 10436,
              "updatedBy": 10436,
              "name": "person_address_street",
              "label": "Adres",
              "hidden": false,
              "children": [],
              "answerType": "INPUT",
              "answerFormat": "TEXT",
              "answerSubformat": "TEXT",
              "mandatory": true,
              "horizontal": false,
              "description": ""
            },
            {
              "class": "com.biit.webforms.persistence.entity.Question",
              "comparationId": "b631c0a3-2fec-454a-94b8-51b36a531dbe",
              "creationTime": "Jun 2, 2015 12:05:59 PM",
              "updateTime": "Jun 17, 2016 12:32:41 PM",
              "createdBy": 10436,
              "updatedBy": 10436,
              "name": "person_address_postal",
              "label": "Postcode",
              "hidden": false,
              "children": [],
              "answerType": "INPUT",
              "answerFormat": "TEXT",
              "answerSubformat": "TEXT",
              "mandatory": true,
              "horizontal": false,
              "description": ""
            },
            {
              "class": "com.biit.webforms.persistence.entity.Question",
              "comparationId": "82afde56-e177-440c-9705-b5b5a6c2d790",
              "creationTime": "Jun 2, 2015 12:06:00 PM",
              "updateTime": "May 16, 2016 9:52:39 AM",
              "createdBy": 10436,
              "updatedBy": 10436,
              "name": "person_address_city",
              "label": "Woonplaats",
              "hidden": false,
              "children": [],
              "answerType": "INPUT",
              "answerFormat": "TEXT",
              "answerSubformat": "TEXT",
              "mandatory": true,
              "horizontal": false,
              "description": ""
            },
            {
              "class": "com.biit.webforms.persistence.entity.Question",
              "comparationId": "bfe91476-b8e3-4cd4-8b0c-86e8c4b7a37d",
              "creationTime": "Mar 30, 2015 5:06:57 PM",
              "updateTime": "Jan 28, 2016 1:09:44 PM",
              "createdBy": 10436,
              "updatedBy": 10436,
              "name": "profile_phone",
              "label": "Mobiel telefoonnummer",
              "hidden": false,
              "children": [],
              "answerType": "INPUT",
              "answerFormat": "TEXT",
              "answerSubformat": "PHONE",
              "mandatory": true,
              "horizontal": false,
              "description": "Om u op een beveiligde manier uw rapport na afloop te kunnen sturen hebben wij uw mobiele nummer nodig\nFormaat \u0027alleen cijfers\u0027 (bv. 0612345678)"
            },
            {
              "class": "com.biit.webforms.persistence.entity.Question",
              "comparationId": "52a52865-0cd3-4aa0-8d42-2b8739df687a",
              "creationTime": "Mar 5, 2015 11:26:18 AM",
              "updateTime": "May 16, 2016 9:52:44 AM",
              "createdBy": 10436,
              "updatedBy": 10436,
              "name": "profile_email_address",
              "label": "eMail",
              "hidden": false,
              "children": [],
              "answerType": "INPUT",
              "answerFormat": "TEXT",
              "answerSubformat": "EMAIL",
              "mandatory": true,
              "horizontal": false,
              "description": "Om eventuele aanvullende gegevens te kunnen verzenden, verzoeken we je een email-adres in te vullen"
            },
            {
              "class": "com.biit.webforms.persistence.entity.Question",
              "comparationId": "80dbedaf-048c-4067-a3c0-5b9797e31f18",
              "creationTime": "Jun 2, 2015 12:06:24 PM",
              "updateTime": "May 16, 2016 9:52:45 AM",
              "createdBy": 10436,
              "updatedBy": 10436,
              "name": "examination_previous_date",
              "label": "Laatste keuring",
              "hidden": false,
              "children": [],
              "answerType": "INPUT",
              "answerFormat": "DATE",
              "answerSubformat": "DATE_PAST",
              "mandatory": false,
              "horizontal": false,
              "description": "Formaat dd-mm-jjjj (bv. 23-07-2014)"
            },
            {
              "class": "com.biit.webforms.persistence.entity.Question",
              "comparationId": "13b88d87-4fee-4f49-a3fd-bd01dab2672f",
              "creationTime": "Jun 2, 2015 12:06:25 PM",
              "updateTime": "May 16, 2016 9:52:47 AM",
              "createdBy": 10436,
              "updatedBy": 10436,
              "name": "examination_previous_location",
              "label": "Locatie",
              "hidden": false,
              "children": [],
              "answerType": "INPUT",
              "answerFormat": "TEXT",
              "answerSubformat": "TEXT",
              "mandatory": false,
              "horizontal": false,
              "description": ""
            }
          ]
        },
        {
          "class": "com.biit.webforms.persistence.entity.Category",
          "comparationId": "cba8323e-9266-482f-b236-e8e037b57541",
          "creationTime": "Jun 2, 2015 12:12:53 PM",
          "updateTime": "May 20, 2016 7:09:41 PM",
          "createdBy": 10436,
          "updatedBy": 10436,
          "name": "Sport",
          "label": "Sport",
          "hidden": false,
          "children": [
            {
              "class": "com.biit.webforms.persistence.entity.Group",
              "comparationId": "0cd67e03-0950-4b87-8c83-e2533aa071a9",
              "creationTime": "Jun 2, 2015 12:15:35 PM",
              "updateTime": "May 20, 2016 7:09:41 PM",
              "createdBy": 10436,
              "updatedBy": 10436,
              "name": "sports",
              "label": "Welke takken van sport beoefent u?",
              "hidden": false,
              "children": [
                {
                  "class": "com.biit.webforms.persistence.entity.Question",
                  "comparationId": "55abc3ef-fd79-43d9-8005-befba9a511c8",
                  "creationTime": "Jun 2, 2015 12:16:16 PM",
                  "updateTime": "Jun 2, 2015 1:38:06 PM",
                  "createdBy": 10436,
                  "updatedBy": 10436,
                  "name": "sport",
                  "label": "Sport",
                  "hidden": false,
                  "children": [],
                  "answerType": "INPUT",
                  "answerFormat": "TEXT",
                  "answerSubformat": "TEXT",
                  "mandatory": false,
                  "horizontal": false,
                  "description": ""
                },
                {
                  "class": "com.biit.webforms.persistence.entity.Question",
                  "comparationId": "ee0a989c-5570-4b25-9675-4010fda3f0ee",
                  "creationTime": "Jun 2, 2015 12:16:17 PM",
                  "updateTime": "Jun 2, 2015 1:38:10 PM",
                  "createdBy": 10436,
                  "updatedBy": 10436,
                  "name": "years",
                  "label": "Aantal jaar",
                  "hidden": false,
                  "children": [],
                  "answerType": "INPUT",
                  "answerFormat": "NUMBER",
                  "answerSubformat": "NUMBER",
                  "mandatory": false,
                  "horizontal": false,
                  "description": ""
                },
                {
                  "class": "com.biit.webforms.persistence.entity.Question",
                  "comparationId": "258778ba-bf05-42cc-82a4-50f1037d6e45",
                  "creationTime": "Jun 2, 2015 12:16:18 PM",
                  "updateTime": "Jun 2, 2015 1:38:13 PM",
                  "createdBy": 10436,
                  "updatedBy": 10436,
                  "name": "hours",
                  "label": "Uren per week",
                  "hidden": false,
                  "children": [],
                  "answerType": "INPUT",
                  "answerFormat": "NUMBER",
                  "answerSubformat": "NUMBER",
                  "mandatory": false,
                  "horizontal": false,
                  "description": ""
                },
                {
                  "class": "com.biit.webforms.persistence.entity.Question",
                  "comparationId": "e7caf138-de32-4267-87e6-f11b2f234ce1",
                  "creationTime": "Jun 2, 2015 12:16:19 PM",
                  "updateTime": "May 16, 2016 9:52:55 AM",
                  "createdBy": 10436,
                  "updatedBy": 10436,
                  "name": "level",
                  "label": "Niveau",
                  "hidden": false,
                  "children": [
                    {
                      "class": "com.biit.webforms.persistence.entity.Answer",
                      "comparationId": "47b28be3-3957-4aca-8d3f-ba7f68d06850",
                      "creationTime": "Jun 2, 2015 12:18:09 PM",
                      "updateTime": "Jun 3, 2015 11:33:46 AM",
                      "createdBy": 10436,
                      "updatedBy": 10436,
                      "name": "level_rec",
                      "label": "Recreatief",
                      "hidden": false,
                      "children": [],
                      "description": ""
                    },
                    {
                      "class": "com.biit.webforms.persistence.entity.Answer",
                      "comparationId": "ac222b38-b5b3-4905-a984-4e1beaf557f2",
                      "creationTime": "Jun 2, 2015 12:18:10 PM",
                      "updateTime": "Jun 3, 2015 11:34:14 AM",
                      "createdBy": 10436,
                      "updatedBy": 10436,
                      "name": "level_nrml",
                      "label": "Wedstrijd",
                      "hidden": false,
                      "children": [],
                      "description": ""
                    },
                    {
                      "class": "com.biit.webforms.persistence.entity.Answer",
                      "comparationId": "214cb77a-eb02-43ee-b45b-c6fc1d8791fb",
                      "creationTime": "Jun 2, 2015 12:18:11 PM",
                      "updateTime": "Jun 3, 2015 11:33:16 AM",
                      "createdBy": 10436,
                      "updatedBy": 10436,
                      "name": "level_pro",
                      "label": "Nationale top",
                      "hidden": false,
                      "children": [],
                      "description": ""
                    },
                    {
                      "class": "com.biit.webforms.persistence.entity.Answer",
                      "comparationId": "e445af9b-7a22-48b0-8831-343f505df29e",
                      "creationTime": "Jun 2, 2015 12:18:11 PM",
                      "updateTime": "Jun 3, 2015 11:34:18 AM",
                      "createdBy": 10436,
                      "updatedBy": 10436,
                      "name": "level_intr",
                      "label": "Internationaal",
                      "hidden": false,
                      "children": [],
                      "description": ""
                    }
                  ],
                  "answerType": "SINGLE_SELECTION_LIST",
                  "mandatory": false,
                  "horizontal": false,
                  "description": ""
                }
              ],
              "repeatable": true
            }
          ]
        },
        {
          "class": "com.biit.webforms.persistence.entity.Category",
          "comparationId": "01a969c3-86f5-4b80-b6c6-5976b5df1b5e",
          "creationTime": "Mar 5, 2015 11:52:22 AM",
          "updateTime": "May 20, 2016 7:09:47 PM",
          "createdBy": 10436,
          "updatedBy": 10436,
          "name": "IllnessInjury",
          "label": "Doorgemaakte ziektes/blessures",
          "hidden": false,
          "children": [
            {
              "class": "com.biit.webforms.persistence.entity.Question",
              "comparationId": "d0b28af5-e607-406e-8657-8a7735a11a9d",
              "creationTime": "Jun 2, 2015 12:55:21 PM",
              "updateTime": "May 20, 2016 7:09:47 PM",
              "createdBy": 10436,
              "updatedBy": 10436,
              "name": "joint_injury",
              "label": "Hebt u last (gehad) van gewrichtsaandoeningen?",
              "hidden": false,
              "children": [
                {
                  "class": "com.biit.webforms.persistence.entity.Answer",
                  "comparationId": "5700d58d-3504-418e-80fd-a5347f5befe4",
                  "creationTime": "Jun 2, 2015 1:06:59 PM",
                  "updateTime": "Jun 2, 2015 1:24:20 PM",
                  "createdBy": 10436,
                  "updatedBy": 10436,
                  "name": "yes",
                  "label": "Ja",
                  "hidden": false,
                  "children": [],
                  "description": ""
                },
                {
                  "class": "com.biit.webforms.persistence.entity.Answer",
                  "comparationId": "ea4aad9f-e447-4546-97b3-953eb7695551",
                  "creationTime": "Jun 2, 2015 1:07:00 PM",
                  "updateTime": "Jun 2, 2015 1:24:27 PM",
                  "createdBy": 10436,
                  "updatedBy": 10436,
                  "name": "no",
                  "label": "Nee",
                  "hidden": false,
                  "children": [],
                  "description": ""
                }
              ],
              "answerType": "SINGLE_SELECTION_RADIO",
              "mandatory": true,
              "horizontal": true,
              "description": ""
            },
            {
              "class": "com.biit.webforms.persistence.entity.Question",
              "comparationId": "45d8f197-d3ba-4e90-91fb-c5a2f3f5ca48",
              "creationTime": "Jul 10, 2015 12:37:53 PM",
              "updateTime": "May 20, 2016 7:09:44 PM",
              "createdBy": 10436,
              "updatedBy": 10436,
              "name": "joint_injury_details",
              "label": "Geef details:",
              "hidden": false,
              "children": [],
              "answerType": "TEXT_AREA",
              "mandatory": true,
              "horizontal": false,
              "description": ""
            },
            {
              "class": "com.biit.webforms.persistence.entity.Question",
              "comparationId": "b7a1bb78-b8bb-4ee5-9253-98e00d4550c4",
              "creationTime": "Jun 2, 2015 12:55:22 PM",
              "updateTime": "May 16, 2016 9:52:55 AM",
              "createdBy": 10436,
              "updatedBy": 10436,
              "name": "muscle_injury",
              "label": "Hebt u last (gehad) van spier/peesaandoeningen?",
              "hidden": false,
              "children": [
                {
                  "class": "com.biit.webforms.persistence.entity.Answer",
                  "comparationId": "a2fc03ed-b89b-4a52-b867-3aae5b79a89f",
                  "creationTime": "Jun 2, 2015 1:07:02 PM",
                  "updateTime": "Jun 2, 2015 1:24:31 PM",
                  "createdBy": 10436,
                  "updatedBy": 10436,
                  "name": "yes",
                  "label": "Ja",
                  "hidden": false,
                  "children": [],
                  "description": ""
                },
                {
                  "class": "com.biit.webforms.persistence.entity.Answer",
                  "comparationId": "723c8de3-9151-4ccb-be85-953705fb24fe",
                  "creationTime": "Jun 2, 2015 1:07:03 PM",
                  "updateTime": "Jun 2, 2015 1:24:36 PM",
                  "createdBy": 10436,
                  "updatedBy": 10436,
                  "name": "no",
                  "label": "Nee",
                  "hidden": false,
                  "children": [],
                  "description": ""
                }
              ],
              "answerType": "SINGLE_SELECTION_RADIO",
              "mandatory": true,
              "horizontal": true,
              "description": ""
            },
            {
              "class": "com.biit.webforms.persistence.entity.Question",
              "comparationId": "901d8e72-a64d-4a52-9e1d-7cf0b156912a",
              "creationTime": "Jul 10, 2015 12:37:55 PM",
              "updateTime": "Jul 10, 2015 1:10:54 PM",
              "createdBy": 10436,
              "updatedBy": 10436,
              "name": "muscle_injury_details",
              "label": "Geef details:",
              "hidden": false,
              "children": [],
              "answerType": "TEXT_AREA",
              "mandatory": true,
              "horizontal": false,
              "description": ""
            },
            {
              "class": "com.biit.webforms.persistence.entity.Question",
              "comparationId": "1eb09ad6-91a9-45b5-a75a-da9ec6cf0fb2",
              "creationTime": "Jun 2, 2015 12:55:23 PM",
              "updateTime": "May 16, 2016 9:52:55 AM",
              "createdBy": 10436,
              "updatedBy": 10436,
              "name": "operation",
              "label": "Hebt u wel eens een operatie ondergaan?",
              "hidden": false,
              "children": [
                {
                  "class": "com.biit.webforms.persistence.entity.Answer",
                  "comparationId": "dc1b64d2-aec6-40a6-869a-f62666c594d6",
                  "creationTime": "Jun 2, 2015 1:07:05 PM",
                  "updateTime": "Jun 2, 2015 1:24:41 PM",
                  "createdBy": 10436,
                  "updatedBy": 10436,
                  "name": "yes",
                  "label": "Ja",
                  "hidden": false,
                  "children": [],
                  "description": ""
                },
                {
                  "class": "com.biit.webforms.persistence.entity.Answer",
                  "comparationId": "390cc7ef-4e98-4236-a71f-6a1082b3c321",
                  "creationTime": "Jun 2, 2015 1:07:05 PM",
                  "updateTime": "Jun 2, 2015 1:24:46 PM",
                  "createdBy": 10436,
                  "updatedBy": 10436,
                  "name": "no",
                  "label": "Nee",
                  "hidden": false,
                  "children": [],
                  "description": ""
                }
              ],
              "answerType": "SINGLE_SELECTION_RADIO",
              "mandatory": true,
              "horizontal": true,
              "description": ""
            },
            {
              "class": "com.biit.webforms.persistence.entity.Question",
              "comparationId": "cd51a81f-96ee-43a2-b63c-8de4733d34ff",
              "creationTime": "Jul 10, 2015 12:37:56 PM",
              "updateTime": "Jul 10, 2015 1:10:59 PM",
              "createdBy": 10436,
              "updatedBy": 10436,
              "name": "operation_details",
              "label": "Geef details:",
              "hidden": false,
              "children": [],
              "answerType": "TEXT_AREA",
              "mandatory": true,
              "horizontal": false,
              "description": ""
            },
            {
              "class": "com.biit.webforms.persistence.entity.Question",
              "comparationId": "b557b77d-3d6a-497c-817a-dca0e525b3eb",
              "creationTime": "Jun 2, 2015 12:55:24 PM",
              "updateTime": "May 16, 2016 9:52:55 AM",
              "createdBy": 10436,
              "updatedBy": 10436,
              "name": "sport_accident",
              "label": "Hebt u wel eens een ernstig sportongeval gehad?",
              "hidden": false,
              "children": [
                {
                  "class": "com.biit.webforms.persistence.entity.Answer",
                  "comparationId": "a32a0a20-acb7-4527-a656-5c6f2c20aa92",
                  "creationTime": "Jun 2, 2015 1:07:08 PM",
                  "updateTime": "Jun 2, 2015 1:24:53 PM",
                  "createdBy": 10436,
                  "updatedBy": 10436,
                  "name": "yes",
                  "label": "Ja",
                  "hidden": false,
                  "children": [],
                  "description": ""
                },
                {
                  "class": "com.biit.webforms.persistence.entity.Answer",
                  "comparationId": "b0e257a8-a660-44b9-b0c5-0aeeca63fdef",
                  "creationTime": "Jun 2, 2015 1:07:08 PM",
                  "updateTime": "Jun 2, 2015 1:24:59 PM",
                  "createdBy": 10436,
                  "updatedBy": 10436,
                  "name": "no",
                  "label": "Nee",
                  "hidden": false,
                  "children": [],
                  "description": ""
                }
              ],
              "answerType": "SINGLE_SELECTION_RADIO",
              "mandatory": true,
              "horizontal": true,
              "description": ""
            },
            {
              "class": "com.biit.webforms.persistence.entity.Question",
              "comparationId": "8e517e02-0e86-4475-b982-650f19f4275a",
              "creationTime": "Jul 10, 2015 12:37:56 PM",
              "updateTime": "Jul 10, 2015 1:11:03 PM",
              "createdBy": 10436,
              "updatedBy": 10436,
              "name": "sport_accident_details",
              "label": "Geef details:",
              "hidden": false,
              "children": [],
              "answerType": "TEXT_AREA",
              "mandatory": true,
              "horizontal": false,
              "description": ""
            },
            {
              "class": "com.biit.webforms.persistence.entity.Question",
              "comparationId": "6c152113-f534-438e-9fba-ed0f3c90340d",
              "creationTime": "Jun 2, 2015 12:55:25 PM",
              "updateTime": "May 16, 2016 9:52:55 AM",
              "createdBy": 10436,
              "updatedBy": 10436,
              "name": "accident",
              "label": "Hebt u wel eens een ernstig ongeval gehad, los van sportbeoefening?",
              "hidden": false,
              "children": [
                {
                  "class": "com.biit.webforms.persistence.entity.Answer",
                  "comparationId": "fed7cc06-4ec4-484c-9a82-dfea8789ea91",
                  "creationTime": "Jun 2, 2015 1:07:12 PM",
                  "updateTime": "Jun 2, 2015 1:25:04 PM",
                  "createdBy": 10436,
                  "updatedBy": 10436,
                  "name": "yes",
                  "label": "Ja",
                  "hidden": false,
                  "children": [],
                  "description": ""
                },
                {
                  "class": "com.biit.webforms.persistence.entity.Answer",
                  "comparationId": "51bd85c1-c350-4196-a036-819f12000ad7",
                  "creationTime": "Jun 2, 2015 1:07:12 PM",
                  "updateTime": "Jun 2, 2015 1:25:09 PM",
                  "createdBy": 10436,
                  "updatedBy": 10436,
                  "name": "no",
                  "label": "Nee",
                  "hidden": false,
                  "children": [],
                  "description": ""
                }
              ],
              "answerType": "SINGLE_SELECTION_RADIO",
              "mandatory": true,
              "horizontal": true,
              "description": ""
            },
            {
              "class": "com.biit.webforms.persistence.entity.Question",
              "comparationId": "c0aa46df-b034-445b-a4b3-d331fbe7d380",
              "creationTime": "Jul 10, 2015 12:37:57 PM",
              "updateTime": "Jul 10, 2015 1:11:09 PM",
              "createdBy": 10436,
              "updatedBy": 10436,
              "name": "accident_details",
              "label": "Geef details:",
              "hidden": false,
              "children": [],
              "answerType": "TEXT_AREA",
              "mandatory": true,
              "horizontal": false,
              "description": ""
            },
            {
              "class": "com.biit.webforms.persistence.entity.Question",
              "comparationId": "33e2e5c7-6dea-48a1-9a9b-ec283dd76b64",
              "creationTime": "Jun 2, 2015 12:55:25 PM",
              "updateTime": "May 16, 2016 9:52:55 AM",
              "createdBy": 10436,
              "updatedBy": 10436,
              "name": "specialist",
              "label": "Bent u het laatste jaar onder behandeling geweest bij een medisch specialist?",
              "hidden": false,
              "children": [
                {
                  "class": "com.biit.webforms.persistence.entity.Answer",
                  "comparationId": "69328cba-a597-481e-be4c-0f1b5e0ec2b3",
                  "creationTime": "Jun 2, 2015 1:07:15 PM",
                  "updateTime": "Jun 2, 2015 1:25:16 PM",
                  "createdBy": 10436,
                  "updatedBy": 10436,
                  "name": "yes",
                  "label": "Ja",
                  "hidden": false,
                  "children": [],
                  "description": ""
                },
                {
                  "class": "com.biit.webforms.persistence.entity.Answer",
                  "comparationId": "b3a123f3-d1ae-4b2b-b34e-5306f0094491",
                  "creationTime": "Jun 2, 2015 1:07:16 PM",
                  "updateTime": "Jun 2, 2015 1:25:22 PM",
                  "createdBy": 10436,
                  "updatedBy": 10436,
                  "name": "no",
                  "label": "Nee",
                  "hidden": false,
                  "children": [],
                  "description": ""
                }
              ],
              "answerType": "SINGLE_SELECTION_RADIO",
              "mandatory": true,
              "horizontal": true,
              "description": ""
            },
            {
              "class": "com.biit.webforms.persistence.entity.Question",
              "comparationId": "ca37b21e-4565-4280-90c6-92cc2fcda575",
              "creationTime": "Jul 10, 2015 12:37:58 PM",
              "updateTime": "Jul 10, 2015 1:11:14 PM",
              "createdBy": 10436,
              "updatedBy": 10436,
              "name": "specialist_details",
              "label": "Geef details:",
              "hidden": false,
              "children": [],
              "answerType": "TEXT_AREA",
              "mandatory": true,
              "horizontal": false,
              "description": ""
            },
            {
              "class": "com.biit.webforms.persistence.entity.Question",
              "comparationId": "cd481dc6-0f41-4372-9e44-fa24ce38f965",
              "creationTime": "Jun 2, 2015 12:55:26 PM",
              "updateTime": "May 16, 2016 9:52:55 AM",
              "createdBy": 10436,
              "updatedBy": 10436,
              "name": "doctor",
              "label": "Bent u het laatste jaar onder behandeling geweest bij de huisarts?",
              "hidden": false,
              "children": [
                {
                  "class": "com.biit.webforms.persistence.entity.Answer",
                  "comparationId": "f83bd96c-1f78-4a80-add1-4712b49b6b61",
                  "creationTime": "Jun 2, 2015 1:07:19 PM",
                  "updateTime": "Jun 2, 2015 1:25:28 PM",
                  "createdBy": 10436,
                  "updatedBy": 10436,
                  "name": "yes",
                  "label": "Ja",
                  "hidden": false,
                  "children": [],
                  "description": ""
                },
                {
                  "class": "com.biit.webforms.persistence.entity.Answer",
                  "comparationId": "aa992fde-ed9f-4e16-9f21-708056e04ee6",
                  "creationTime": "Jun 2, 2015 1:07:20 PM",
                  "updateTime": "Jun 2, 2015 1:25:33 PM",
                  "createdBy": 10436,
                  "updatedBy": 10436,
                  "name": "no",
                  "label": "Nee",
                  "hidden": false,
                  "children": [],
                  "description": ""
                }
              ],
              "answerType": "SINGLE_SELECTION_RADIO",
              "mandatory": true,
              "horizontal": true,
              "description": ""
            },
            {
              "class": "com.biit.webforms.persistence.entity.Question",
              "comparationId": "aaf1fd3d-d1a0-49fe-aaf3-0b6241613b4f",
              "creationTime": "Jul 10, 2015 12:37:59 PM",
              "updateTime": "Jul 10, 2015 1:11:19 PM",
              "createdBy": 10436,
              "updatedBy": 10436,
              "name": "doctor_details",
              "label": "Geef details:",
              "hidden": false,
              "children": [],
              "answerType": "TEXT_AREA",
              "mandatory": true,
              "horizontal": false,
              "description": ""
            },
            {
              "class": "com.biit.webforms.persistence.entity.Question",
              "comparationId": "e437f094-7289-4f54-b6bd-eaba904e93ff",
              "creationTime": "Jun 2, 2015 12:55:27 PM",
              "updateTime": "May 16, 2016 9:52:55 AM",
              "createdBy": 10436,
              "updatedBy": 10436,
              "name": "rejected",
              "label": "Bent u wel eens afgekeurd?",
              "hidden": false,
              "children": [
                {
                  "class": "com.biit.webforms.persistence.entity.Answer",
                  "comparationId": "966211e8-4306-4c3f-87dc-bc9b73419bf6",
                  "creationTime": "Jun 2, 2015 1:07:23 PM",
                  "updateTime": "Jun 2, 2015 1:25:38 PM",
                  "createdBy": 10436,
                  "updatedBy": 10436,
                  "name": "yes",
                  "label": "Ja",
                  "hidden": false,
                  "children": [],
                  "description": ""
                },
                {
                  "class": "com.biit.webforms.persistence.entity.Answer",
                  "comparationId": "88d8c5c9-bd75-4ea6-ac1d-1c44f8a9120f",
                  "creationTime": "Jun 2, 2015 1:07:25 PM",
                  "updateTime": "Jun 2, 2015 1:25:46 PM",
                  "createdBy": 10436,
                  "updatedBy": 10436,
                  "name": "no",
                  "label": "Nee",
                  "hidden": false,
                  "children": [],
                  "description": ""
                }
              ],
              "answerType": "SINGLE_SELECTION_RADIO",
              "mandatory": true,
              "horizontal": true,
              "description": ""
            },
            {
              "class": "com.biit.webforms.persistence.entity.Question",
              "comparationId": "f29ba4d4-05fa-4ced-8e93-c09c9812a7f5",
              "creationTime": "Jul 10, 2015 12:38:00 PM",
              "updateTime": "Jul 10, 2015 1:11:23 PM",
              "createdBy": 10436,
              "updatedBy": 10436,
              "name": "rejected_details",
              "label": "Geef details:",
              "hidden": false,
              "children": [],
              "answerType": "TEXT_AREA",
              "mandatory": true,
              "horizontal": false,
              "description": ""
            },
            {
              "class": "com.biit.webforms.persistence.entity.Question",
              "comparationId": "690b415d-3824-4153-9ad2-8c60a61773e6",
              "creationTime": "Jun 2, 2015 12:55:28 PM",
              "updateTime": "May 16, 2016 9:52:55 AM",
              "createdBy": 10436,
              "updatedBy": 10436,
              "name": "flu",
              "label": "Bent u in de laatste maand ziek geweest met koorts?",
              "hidden": false,
              "children": [
                {
                  "class": "com.biit.webforms.persistence.entity.Answer",
                  "comparationId": "214c264d-7e3d-425c-8c46-9ae3d301027e",
                  "creationTime": "Jun 2, 2015 1:07:28 PM",
                  "updateTime": "Jun 2, 2015 1:25:53 PM",
                  "createdBy": 10436,
                  "updatedBy": 10436,
                  "name": "yes",
                  "label": "Ja",
                  "hidden": false,
                  "children": [],
                  "description": ""
                },
                {
                  "class": "com.biit.webforms.persistence.entity.Answer",
                  "comparationId": "80db2675-76e2-4045-a1a7-371d686d5ab6",
                  "creationTime": "Jun 2, 2015 1:07:29 PM",
                  "updateTime": "Jun 2, 2015 1:25:59 PM",
                  "createdBy": 10436,
                  "updatedBy": 10436,
                  "name": "no",
                  "label": "Nee",
                  "hidden": false,
                  "children": [],
                  "description": ""
                }
              ],
              "answerType": "SINGLE_SELECTION_RADIO",
              "mandatory": true,
              "horizontal": true,
              "description": ""
            },
            {
              "class": "com.biit.webforms.persistence.entity.Question",
              "comparationId": "c48bf314-1b28-49a1-ab7e-161da7f9350c",
              "creationTime": "Jul 10, 2015 12:38:01 PM",
              "updateTime": "Jul 10, 2015 1:11:30 PM",
              "createdBy": 10436,
              "updatedBy": 10436,
              "name": "flu_details",
              "label": "Geef details:",
              "hidden": false,
              "children": [],
              "answerType": "TEXT_AREA",
              "mandatory": true,
              "horizontal": false,
              "description": ""
            },
            {
              "class": "com.biit.webforms.persistence.entity.Question",
              "comparationId": "2fc2c3fc-4b51-4b13-9922-a5fdb67ba998",
              "creationTime": "Jun 2, 2015 12:55:29 PM",
              "updateTime": "May 16, 2016 9:52:55 AM",
              "createdBy": 10436,
              "updatedBy": 10436,
              "name": "injuries_in_the_past",
              "label": "Bent u in de afgelopen tijd geblesseerd geweest?",
              "hidden": false,
              "children": [
                {
                  "class": "com.biit.webforms.persistence.entity.Answer",
                  "comparationId": "fe19475b-ef52-407e-82c7-81df4b6eaa6c",
                  "creationTime": "Jun 2, 2015 1:07:32 PM",
                  "updateTime": "Jun 2, 2015 1:26:05 PM",
                  "createdBy": 10436,
                  "updatedBy": 10436,
                  "name": "yes",
                  "label": "Ja",
                  "hidden": false,
                  "children": [],
                  "description": ""
                },
                {
                  "class": "com.biit.webforms.persistence.entity.Answer",
                  "comparationId": "78bf9c3e-3bb4-483b-b625-cbad6063a4f0",
                  "creationTime": "Jun 2, 2015 1:07:33 PM",
                  "updateTime": "Jun 2, 2015 1:26:11 PM",
                  "createdBy": 10436,
                  "updatedBy": 10436,
                  "name": "no",
                  "label": "Nee",
                  "hidden": false,
                  "children": [],
                  "description": ""
                }
              ],
              "answerType": "SINGLE_SELECTION_RADIO",
              "mandatory": true,
              "horizontal": true,
              "description": ""
            },
            {
              "class": "com.biit.webforms.persistence.entity.Question",
              "comparationId": "f6465672-315c-43a3-bed6-555730e72bda",
              "creationTime": "Jul 10, 2015 12:38:01 PM",
              "updateTime": "Jul 10, 2015 1:11:35 PM",
              "createdBy": 10436,
              "updatedBy": 10436,
              "name": "injuries_in_the_past_details",
              "label": "Geef details:",
              "hidden": false,
              "children": [],
              "answerType": "TEXT_AREA",
              "mandatory": true,
              "horizontal": false,
              "description": ""
            },
            {
              "class": "com.biit.webforms.persistence.entity.Question",
              "comparationId": "a1e83d5f-e191-4df8-8002-b555e850dba7",
              "creationTime": "Jun 2, 2015 12:55:30 PM",
              "updateTime": "May 16, 2016 9:52:55 AM",
              "createdBy": 10436,
              "updatedBy": 10436,
              "name": "injured",
              "label": "Bent u momenteel nog geblesseerd?",
              "hidden": false,
              "children": [
                {
                  "class": "com.biit.webforms.persistence.entity.Answer",
                  "comparationId": "cd2dd8c4-d66b-4a5f-abb8-0fbbf598f897",
                  "creationTime": "Jun 2, 2015 1:07:36 PM",
                  "updateTime": "Jun 2, 2015 1:26:19 PM",
                  "createdBy": 10436,
                  "updatedBy": 10436,
                  "name": "yes",
                  "label": "Ja",
                  "hidden": false,
                  "children": [],
                  "description": ""
                },
                {
                  "class": "com.biit.webforms.persistence.entity.Answer",
                  "comparationId": "1909c809-24eb-476d-85e8-5fd4d6093a3e",
                  "creationTime": "Jun 2, 2015 1:07:37 PM",
                  "updateTime": "Jun 2, 2015 1:26:28 PM",
                  "createdBy": 10436,
                  "updatedBy": 10436,
                  "name": "no",
                  "label": "Nee",
                  "hidden": false,
                  "children": [],
                  "description": ""
                }
              ],
              "answerType": "SINGLE_SELECTION_RADIO",
              "mandatory": true,
              "horizontal": true,
              "description": ""
            },
            {
              "class": "com.biit.webforms.persistence.entity.Question",
              "comparationId": "93517dca-7f09-49e9-bcf9-5123f83b79fe",
              "creationTime": "Jul 10, 2015 12:38:02 PM",
              "updateTime": "Jul 10, 2015 1:11:42 PM",
              "createdBy": 10436,
              "updatedBy": 10436,
              "name": "injured_details",
              "label": "Geef details:",
              "hidden": false,
              "children": [],
              "answerType": "TEXT_AREA",
              "mandatory": true,
              "horizontal": false,
              "description": ""
            },
            {
              "class": "com.biit.webforms.persistence.entity.Text",
              "comparationId": "dc72f480-4c8a-4176-8957-c6226e1ff074",
              "creationTime": "Oct 20, 2015 1:40:47 PM",
              "updateTime": "Oct 20, 2015 1:44:29 PM",
              "createdBy": 10436,
              "updatedBy": 10436,
              "name": "EndIllnessinjury",
              "label": "Einde Doorgemaakte ziektes/ble...",
              "hidden": false,
              "children": [],
              "description": "Einde Doorgemaakte ziektes/blessures"
            }
          ]
        },
        {
          "class": "com.biit.webforms.persistence.entity.Category",
          "comparationId": "a4ca6fed-76ba-43e1-bb6f-fe5aee2d6151",
          "creationTime": "Mar 5, 2015 1:15:45 PM",
          "updateTime": "May 16, 2016 9:52:55 AM",
          "createdBy": 10436,
          "updatedBy": 10436,
          "name": "HealthLifestyle",
          "label": "Algemene gezondheid",
          "hidden": false,
          "children": [
            {
              "class": "com.biit.webforms.persistence.entity.Question",
              "comparationId": "5c55debb-c132-4817-bbac-32b8c3a14857",
              "creationTime": "Jun 2, 2015 1:17:32 PM",
              "updateTime": "May 16, 2016 9:52:55 AM",
              "createdBy": 10436,
              "updatedBy": 10436,
              "name": "health_issues",
              "label": "Heeft u op het moment gezondheidsklachten?",
              "hidden": false,
              "children": [
                {
                  "class": "com.biit.webforms.persistence.entity.Answer",
                  "comparationId": "4bb1565e-f3a4-4bda-89a4-0c7f5a478593",
                  "creationTime": "Jun 2, 2015 1:23:52 PM",
                  "updateTime": "Jun 2, 2015 1:26:42 PM",
                  "createdBy": 10436,
                  "updatedBy": 10436,
                  "name": "yes",
                  "label": "Ja",
                  "hidden": false,
                  "children": [],
                  "description": ""
                },
                {
                  "class": "com.biit.webforms.persistence.entity.Answer",
                  "comparationId": "a56afdb7-d86e-4661-b104-b8b65e63400d",
                  "creationTime": "Jun 2, 2015 1:23:53 PM",
                  "updateTime": "Jun 2, 2015 1:26:52 PM",
                  "createdBy": 10436,
                  "updatedBy": 10436,
                  "name": "no",
                  "label": "Nee",
                  "hidden": false,
                  "children": [],
                  "description": ""
                }
              ],
              "answerType": "SINGLE_SELECTION_RADIO",
              "mandatory": true,
              "horizontal": true,
              "description": ""
            },
            {
              "class": "com.biit.webforms.persistence.entity.Question",
              "comparationId": "a34fafd3-361f-4990-8525-cc3c4181f4a0",
              "creationTime": "Jul 10, 2015 1:12:25 PM",
              "updateTime": "Jul 10, 2015 1:24:06 PM",
              "createdBy": 10436,
              "updatedBy": 10436,
              "name": "health_issues_details",
              "label": "Geef details:",
              "hidden": false,
              "children": [],
              "answerType": "TEXT_AREA",
              "mandatory": true,
              "horizontal": false,
              "description": ""
            },
            {
              "class": "com.biit.webforms.persistence.entity.Question",
              "comparationId": "59a2e912-623f-4d29-8ee0-28435aebe899",
              "creationTime": "Mar 5, 2015 1:16:04 PM",
              "updateTime": "May 16, 2016 9:52:55 AM",
              "createdBy": 10436,
              "updatedBy": 10436,
              "name": "often_tired",
              "label": "Voelt u zich vaak onverklaarbaar vermoeid?",
              "hidden": false,
              "children": [
                {
                  "class": "com.biit.webforms.persistence.entity.Answer",
                  "comparationId": "29d1e6d8-64ce-41f5-963f-07d16acf1603",
                  "creationTime": "Mar 5, 2015 1:17:28 PM",
                  "updateTime": "Mar 30, 2015 6:06:42 PM",
                  "createdBy": 10436,
                  "updatedBy": 10436,
                  "name": "yes",
                  "label": "Ja",
                  "hidden": false,
                  "children": [],
                  "description": ""
                },
                {
                  "class": "com.biit.webforms.persistence.entity.Answer",
                  "comparationId": "7ca1c796-101c-49ad-ab84-5e95d69a270a",
                  "creationTime": "Mar 5, 2015 1:17:29 PM",
                  "updateTime": "Mar 30, 2015 6:07:15 PM",
                  "createdBy": 10436,
                  "updatedBy": 10436,
                  "name": "no",
                  "label": "Nee",
                  "hidden": false,
                  "children": [],
                  "description": ""
                }
              ],
              "answerType": "SINGLE_SELECTION_RADIO",
              "mandatory": true,
              "horizontal": true,
              "description": ""
            },
            {
              "class": "com.biit.webforms.persistence.entity.Question",
              "comparationId": "98225c8d-3ecc-4b3f-b0f0-d037bef2d368",
              "creationTime": "Jul 10, 2015 1:12:27 PM",
              "updateTime": "Jul 10, 2015 1:24:10 PM",
              "createdBy": 10436,
              "updatedBy": 10436,
              "name": "often_tired_details",
              "label": "Geef details:",
              "hidden": false,
              "children": [],
              "answerType": "TEXT_AREA",
              "mandatory": true,
              "horizontal": false,
              "description": ""
            },
            {
              "class": "com.biit.webforms.persistence.entity.Question",
              "comparationId": "3e5bdce5-189a-4131-a029-7721f30cb94f",
              "creationTime": "Mar 5, 2015 1:16:05 PM",
              "updateTime": "May 16, 2016 9:52:55 AM",
              "createdBy": 10436,
              "updatedBy": 10436,
              "name": "often_cold",
              "label": "Bent u vaak verkouden of grieperig?",
              "hidden": false,
              "children": [
                {
                  "class": "com.biit.webforms.persistence.entity.Answer",
                  "comparationId": "1144bf74-a3a5-4b71-851a-ea59f2e69ba4",
                  "creationTime": "Mar 5, 2015 1:23:10 PM",
                  "updateTime": "Mar 30, 2015 6:09:20 PM",
                  "createdBy": 10436,
                  "updatedBy": 10436,
                  "name": "yes",
                  "label": "Ja",
                  "hidden": false,
                  "children": [],
                  "description": ""
                },
                {
                  "class": "com.biit.webforms.persistence.entity.Answer",
                  "comparationId": "c40e112b-f76b-4e4d-94bd-53b2a2d5db45",
                  "creationTime": "Mar 5, 2015 1:23:10 PM",
                  "updateTime": "Mar 30, 2015 6:09:24 PM",
                  "createdBy": 10436,
                  "updatedBy": 10436,
                  "name": "no",
                  "label": "Nee",
                  "hidden": false,
                  "children": [],
                  "description": ""
                }
              ],
              "answerType": "SINGLE_SELECTION_RADIO",
              "mandatory": true,
              "horizontal": true,
              "description": ""
            },
            {
              "class": "com.biit.webforms.persistence.entity.Question",
              "comparationId": "7cc31f9b-a4c2-4dca-937a-89bd60627a4a",
              "creationTime": "Jul 10, 2015 1:12:29 PM",
              "updateTime": "Jul 10, 2015 1:24:14 PM",
              "createdBy": 10436,
              "updatedBy": 10436,
              "name": "often_cold_details",
              "label": "Geef details:",
              "hidden": false,
              "children": [],
              "answerType": "TEXT_AREA",
              "mandatory": true,
              "horizontal": false,
              "description": ""
            },
            {
              "class": "com.biit.webforms.persistence.entity.Question",
              "comparationId": "4af25c25-8d30-4764-99fb-7ccc70778a60",
              "creationTime": "Mar 5, 2015 1:16:06 PM",
              "updateTime": "May 16, 2016 9:52:55 AM",
              "createdBy": 10436,
              "updatedBy": 10436,
              "name": "cough_a_lot",
              "label": "Hoest u veel?",
              "hidden": false,
              "children": [
                {
                  "class": "com.biit.webforms.persistence.entity.Answer",
                  "comparationId": "ed82ed31-ccf8-411b-9e11-7c72db20b602",
                  "creationTime": "Mar 5, 2015 1:23:06 PM",
                  "updateTime": "Apr 28, 2015 11:26:12 AM",
                  "createdBy": 10436,
                  "updatedBy": 10436,
                  "name": "yes",
                  "label": "Ja",
                  "hidden": false,
                  "children": [],
                  "description": ""
                },
                {
                  "class": "com.biit.webforms.persistence.entity.Answer",
                  "comparationId": "468a4e19-2f3b-4a6f-b619-e343e0643242",
                  "creationTime": "Mar 5, 2015 1:23:07 PM",
                  "updateTime": "Mar 30, 2015 6:09:51 PM",
                  "createdBy": 10436,
                  "updatedBy": 10436,
                  "name": "no",
                  "label": "Nee",
                  "hidden": false,
                  "children": [],
                  "description": ""
                }
              ],
              "answerType": "SINGLE_SELECTION_RADIO",
              "mandatory": true,
              "horizontal": true,
              "description": ""
            },
            {
              "class": "com.biit.webforms.persistence.entity.Question",
              "comparationId": "f9fd36ea-f67c-40a2-b808-65a768f53dc5",
              "creationTime": "Jul 10, 2015 1:12:30 PM",
              "updateTime": "Jul 10, 2015 1:24:18 PM",
              "createdBy": 10436,
              "updatedBy": 10436,
              "name": "cough_a_lot_details",
              "label": "Geef details:",
              "hidden": false,
              "children": [],
              "answerType": "TEXT_AREA",
              "mandatory": true,
              "horizontal": false,
              "description": ""
            },
            {
              "class": "com.biit.webforms.persistence.entity.Question",
              "comparationId": "2b01daf1-940e-49f4-8f4b-bef5a2b3a871",
              "creationTime": "Mar 5, 2015 1:16:07 PM",
              "updateTime": "May 16, 2016 9:52:55 AM",
              "createdBy": 10436,
              "updatedBy": 10436,
              "name": "cough_blood_mocus",
              "label": "Moet u wel eens bloed of slijm ophoesten (na intensief sporten)?",
              "hidden": false,
              "children": [
                {
                  "class": "com.biit.webforms.persistence.entity.Answer",
                  "comparationId": "fad5a2a9-8930-4204-a1f8-42ec31eac686",
                  "creationTime": "Mar 5, 2015 1:23:14 PM",
                  "updateTime": "Mar 30, 2015 6:10:19 PM",
                  "createdBy": 10436,
                  "updatedBy": 10436,
                  "name": "yes",
                  "label": "Ja",
                  "hidden": false,
                  "children": [],
                  "description": ""
                },
                {
                  "class": "com.biit.webforms.persistence.entity.Answer",
                  "comparationId": "98258ef4-ad71-40fc-99b7-4f334e83b58f",
                  "creationTime": "Mar 5, 2015 1:23:14 PM",
                  "updateTime": "Mar 30, 2015 6:10:32 PM",
                  "createdBy": 10436,
                  "updatedBy": 10436,
                  "name": "no",
                  "label": "Nee",
                  "hidden": false,
                  "children": [],
                  "description": ""
                }
              ],
              "answerType": "SINGLE_SELECTION_RADIO",
              "mandatory": true,
              "horizontal": true,
              "description": ""
            },
            {
              "class": "com.biit.webforms.persistence.entity.Question",
              "comparationId": "66f1cf3f-44ea-4450-991f-2d5cb5e3ea54",
              "creationTime": "Jul 10, 2015 1:12:32 PM",
              "updateTime": "Jul 10, 2015 1:24:22 PM",
              "createdBy": 10436,
              "updatedBy": 10436,
              "name": "cough_blood_mocus_details",
              "label": "Geef details:",
              "hidden": false,
              "children": [],
              "answerType": "TEXT_AREA",
              "mandatory": true,
              "horizontal": false,
              "description": ""
            },
            {
              "class": "com.biit.webforms.persistence.entity.Question",
              "comparationId": "e431a0fc-e1b2-4e4a-a431-76522e96d3a3",
              "creationTime": "Mar 5, 2015 1:16:07 PM",
              "updateTime": "May 16, 2016 9:52:55 AM",
              "createdBy": 10436,
              "updatedBy": 10436,
              "name": "glasses_lenses",
              "label": "Draagt u een bril en/of hebt u lenzen?",
              "hidden": false,
              "children": [
                {
                  "class": "com.biit.webforms.persistence.entity.Answer",
                  "comparationId": "0a603244-7004-4aae-aa97-4e41daaae79e",
                  "creationTime": "Mar 5, 2015 1:23:18 PM",
                  "updateTime": "Mar 30, 2015 6:14:50 PM",
                  "createdBy": 10436,
                  "updatedBy": 10436,
                  "name": "yes",
                  "label": "Ja",
                  "hidden": false,
                  "children": [],
                  "description": ""
                },
                {
                  "class": "com.biit.webforms.persistence.entity.Answer",
                  "comparationId": "d1623c3f-9231-4fdd-8ffa-9d585c15cbc3",
                  "creationTime": "Mar 5, 2015 1:23:18 PM",
                  "updateTime": "Mar 30, 2015 6:14:58 PM",
                  "createdBy": 10436,
                  "updatedBy": 10436,
                  "name": "no",
                  "label": "Nee",
                  "hidden": false,
                  "children": [],
                  "description": ""
                }
              ],
              "answerType": "SINGLE_SELECTION_RADIO",
              "mandatory": true,
              "horizontal": true,
              "description": ""
            },
            {
              "class": "com.biit.webforms.persistence.entity.Question",
              "comparationId": "474414af-f409-4323-b0c3-5f56961e0e50",
              "creationTime": "Jul 10, 2015 1:12:33 PM",
              "updateTime": "Jul 10, 2015 1:24:28 PM",
              "createdBy": 10436,
              "updatedBy": 10436,
              "name": "glasses_lenses_details",
              "label": "Geef details:",
              "hidden": false,
              "children": [],
              "answerType": "TEXT_AREA",
              "mandatory": true,
              "horizontal": false,
              "description": ""
            },
            {
              "class": "com.biit.webforms.persistence.entity.Question",
              "comparationId": "1c4e636c-0e70-4dc3-9241-50eddb460585",
              "creationTime": "Mar 5, 2015 1:16:08 PM",
              "updateTime": "May 16, 2016 9:52:55 AM",
              "createdBy": 10436,
              "updatedBy": 10436,
              "name": "hearing_problems",
              "label": "Heeft u klachten over uw gehoor?",
              "hidden": false,
              "children": [
                {
                  "class": "com.biit.webforms.persistence.entity.Answer",
                  "comparationId": "f152d014-bf4c-4978-bf0c-12af07aa6e11",
                  "creationTime": "Mar 5, 2015 1:23:22 PM",
                  "updateTime": "Mar 30, 2015 6:15:42 PM",
                  "createdBy": 10436,
                  "updatedBy": 10436,
                  "name": "yes",
                  "label": "Ja",
                  "hidden": false,
                  "children": [],
                  "description": ""
                },
                {
                  "class": "com.biit.webforms.persistence.entity.Answer",
                  "comparationId": "8c36d1d3-4255-49b3-94b2-ab6876342202",
                  "creationTime": "Mar 5, 2015 1:23:22 PM",
                  "updateTime": "Mar 30, 2015 6:15:33 PM",
                  "createdBy": 10436,
                  "updatedBy": 10436,
                  "name": "no",
                  "label": "Nee",
                  "hidden": false,
                  "children": [],
                  "description": ""
                }
              ],
              "answerType": "SINGLE_SELECTION_RADIO",
              "mandatory": true,
              "horizontal": true,
              "description": ""
            },
            {
              "class": "com.biit.webforms.persistence.entity.Question",
              "comparationId": "523057b7-3e07-4f24-ae5a-a28f7b2c8f89",
              "creationTime": "Jul 10, 2015 1:12:35 PM",
              "updateTime": "Jul 10, 2015 1:24:33 PM",
              "createdBy": 10436,
              "updatedBy": 10436,
              "name": "hearing_problems_details",
              "label": "Geef details:",
              "hidden": false,
              "children": [],
              "answerType": "TEXT_AREA",
              "mandatory": true,
              "horizontal": false,
              "description": ""
            },
            {
              "class": "com.biit.webforms.persistence.entity.Question",
              "comparationId": "433b47e8-bd5d-4639-bd86-3436271a202d",
              "creationTime": "Mar 5, 2015 1:16:09 PM",
              "updateTime": "May 16, 2016 9:52:55 AM",
              "createdBy": 10436,
              "updatedBy": 10436,
              "name": "urination_problems",
              "label": "Hebt u (soms) problemen met plassen?",
              "hidden": false,
              "children": [
                {
                  "class": "com.biit.webforms.persistence.entity.Answer",
                  "comparationId": "edfa4105-be27-43c3-99b1-0f74284c8e8e",
                  "creationTime": "Mar 5, 2015 1:23:26 PM",
                  "updateTime": "Mar 30, 2015 6:11:08 PM",
                  "createdBy": 10436,
                  "updatedBy": 10436,
                  "name": "yes",
                  "label": "Ja",
                  "hidden": false,
                  "children": [],
                  "description": ""
                },
                {
                  "class": "com.biit.webforms.persistence.entity.Answer",
                  "comparationId": "842debd3-7df2-45d4-94c2-0eca1bba7658",
                  "creationTime": "Mar 5, 2015 1:23:27 PM",
                  "updateTime": "Mar 30, 2015 6:11:21 PM",
                  "createdBy": 10436,
                  "updatedBy": 10436,
                  "name": "no",
                  "label": "Nee",
                  "hidden": false,
                  "children": [],
                  "description": ""
                }
              ],
              "answerType": "SINGLE_SELECTION_RADIO",
              "mandatory": true,
              "horizontal": true,
              "description": ""
            },
            {
              "class": "com.biit.webforms.persistence.entity.Question",
              "comparationId": "1290b72c-1a17-4267-acf6-75e4b6776dd2",
              "creationTime": "Jul 10, 2015 1:12:37 PM",
              "updateTime": "Jul 10, 2015 1:24:41 PM",
              "createdBy": 10436,
              "updatedBy": 10436,
              "name": "urination_problems_details",
              "label": "Geef details:",
              "hidden": false,
              "children": [],
              "answerType": "TEXT_AREA",
              "mandatory": true,
              "horizontal": false,
              "description": ""
            },
            {
              "class": "com.biit.webforms.persistence.entity.Question",
              "comparationId": "c80a7798-e17f-4fdd-b6e0-1c734375f37f",
              "creationTime": "Mar 5, 2015 1:16:10 PM",
              "updateTime": "May 16, 2016 9:52:55 AM",
              "createdBy": 10436,
              "updatedBy": 10436,
              "name": "digestive_problems",
              "label": "Hebt u (soms) problemen met je spijsvertering?",
              "hidden": false,
              "children": [
                {
                  "class": "com.biit.webforms.persistence.entity.Answer",
                  "comparationId": "e5339bc1-017e-44b8-8d20-d03c33826f98",
                  "creationTime": "Mar 5, 2015 1:21:49 PM",
                  "updateTime": "Mar 30, 2015 6:11:49 PM",
                  "createdBy": 10436,
                  "updatedBy": 10436,
                  "name": "yes",
                  "label": "Ja",
                  "hidden": false,
                  "children": [],
                  "description": ""
                },
                {
                  "class": "com.biit.webforms.persistence.entity.Answer",
                  "comparationId": "4e495b07-fd09-47e4-9f02-6bcceea150e5",
                  "creationTime": "Mar 5, 2015 1:21:49 PM",
                  "updateTime": "Mar 30, 2015 6:12:36 PM",
                  "createdBy": 10436,
                  "updatedBy": 10436,
                  "name": "no",
                  "label": "Nee",
                  "hidden": false,
                  "children": [],
                  "description": ""
                }
              ],
              "answerType": "SINGLE_SELECTION_RADIO",
              "mandatory": true,
              "horizontal": true,
              "description": ""
            },
            {
              "class": "com.biit.webforms.persistence.entity.Question",
              "comparationId": "086393c4-ca93-4964-8d8b-be9c98d02249",
              "creationTime": "Jul 10, 2015 1:12:39 PM",
              "updateTime": "Jul 10, 2015 1:24:45 PM",
              "createdBy": 10436,
              "updatedBy": 10436,
              "name": "digestive_problems_details",
              "label": "Geef details:",
              "hidden": false,
              "children": [],
              "answerType": "TEXT_AREA",
              "mandatory": true,
              "horizontal": false,
              "description": ""
            },
            {
              "class": "com.biit.webforms.persistence.entity.Question",
              "comparationId": "a04935da-1aa0-4a96-85e9-fef7531a71de",
              "creationTime": "Jun 2, 2015 1:23:07 PM",
              "updateTime": "May 16, 2016 9:52:55 AM",
              "createdBy": 10436,
              "updatedBy": 10436,
              "name": "medication",
              "label": "Gebruikt u medicijnen?",
              "hidden": false,
              "children": [
                {
                  "class": "com.biit.webforms.persistence.entity.Answer",
                  "comparationId": "e52b21d0-dc53-4d6a-85cd-2d50e15c651a",
                  "creationTime": "Jun 2, 2015 1:23:56 PM",
                  "updateTime": "Jun 2, 2015 1:27:00 PM",
                  "createdBy": 10436,
                  "updatedBy": 10436,
                  "name": "yes",
                  "label": "Ja",
                  "hidden": false,
                  "children": [],
                  "description": ""
                },
                {
                  "class": "com.biit.webforms.persistence.entity.Answer",
                  "comparationId": "2b7d014a-1abe-4976-b235-00e12cbc946e",
                  "creationTime": "Jun 2, 2015 1:23:57 PM",
                  "updateTime": "Jun 2, 2015 1:27:06 PM",
                  "createdBy": 10436,
                  "updatedBy": 10436,
                  "name": "no",
                  "label": "Nee",
                  "hidden": false,
                  "children": [],
                  "description": ""
                }
              ],
              "answerType": "SINGLE_SELECTION_RADIO",
              "mandatory": true,
              "horizontal": true,
              "description": ""
            },
            {
              "class": "com.biit.webforms.persistence.entity.Question",
              "comparationId": "1f26980d-0728-4b2c-afd3-b15238378c11",
              "creationTime": "Jun 2, 2015 1:43:25 PM",
              "updateTime": "Jul 10, 2015 1:24:48 PM",
              "createdBy": 10436,
              "updatedBy": 10436,
              "name": "medication_details",
              "label": "Geef details:",
              "hidden": false,
              "children": [],
              "answerType": "TEXT_AREA",
              "mandatory": true,
              "horizontal": false,
              "description": ""
            },
            {
              "class": "com.biit.webforms.persistence.entity.Question",
              "comparationId": "5dccd13d-9dfc-414d-b557-13f4f20b7ce5",
              "creationTime": "Mar 30, 2015 5:54:39 PM",
              "updateTime": "May 16, 2016 9:52:55 AM",
              "createdBy": 10436,
              "updatedBy": 10436,
              "name": "alcohol",
              "label": "Drinkt u gemiddeld meer dan 2 glazen alcohol per dag?",
              "hidden": false,
              "children": [
                {
                  "class": "com.biit.webforms.persistence.entity.Answer",
                  "comparationId": "c9606869-04f6-4b4a-b0e8-ddc1a52a4997",
                  "creationTime": "Mar 30, 2015 5:55:52 PM",
                  "updateTime": "Mar 30, 2015 5:56:13 PM",
                  "createdBy": 10436,
                  "updatedBy": 10436,
                  "name": "yes",
                  "label": "Ja",
                  "hidden": false,
                  "children": [],
                  "description": ""
                },
                {
                  "class": "com.biit.webforms.persistence.entity.Answer",
                  "comparationId": "a434472a-51fd-4309-9194-11f6e5907ffc",
                  "creationTime": "Mar 30, 2015 5:55:53 PM",
                  "updateTime": "Mar 30, 2015 5:56:11 PM",
                  "createdBy": 10436,
                  "updatedBy": 10436,
                  "name": "no",
                  "label": "Nee",
                  "hidden": false,
                  "children": [],
                  "description": ""
                }
              ],
              "answerType": "SINGLE_SELECTION_RADIO",
              "mandatory": true,
              "horizontal": true,
              "description": ""
            },
            {
              "class": "com.biit.webforms.persistence.entity.Question",
              "comparationId": "fc8d9a26-f74c-4585-b0b8-862b476c757f",
              "creationTime": "Jul 10, 2015 1:12:41 PM",
              "updateTime": "Jul 10, 2015 1:24:53 PM",
              "createdBy": 10436,
              "updatedBy": 10436,
              "name": "alcohol_details",
              "label": "Geef details:",
              "hidden": false,
              "children": [],
              "answerType": "TEXT_AREA",
              "mandatory": true,
              "horizontal": false,
              "description": ""
            },
            {
              "class": "com.biit.webforms.persistence.entity.Question",
              "comparationId": "54716876-b8d2-4f15-ba73-f72dba919f22",
              "creationTime": "Mar 5, 2015 1:10:08 PM",
              "updateTime": "May 16, 2016 9:52:55 AM",
              "createdBy": 10436,
              "updatedBy": 10436,
              "name": "smoke",
              "label": "Rookt u?",
              "hidden": false,
              "children": [
                {
                  "class": "com.biit.webforms.persistence.entity.Answer",
                  "comparationId": "ee1251b7-7e9c-43d3-b771-16439c1a175d",
                  "creationTime": "Mar 5, 2015 1:10:52 PM",
                  "updateTime": "Mar 30, 2015 5:55:44 PM",
                  "createdBy": 10436,
                  "updatedBy": 10436,
                  "name": "yes",
                  "label": "Ja",
                  "hidden": false,
                  "children": [],
                  "description": ""
                },
                {
                  "class": "com.biit.webforms.persistence.entity.Answer",
                  "comparationId": "a1b13872-0ef5-457a-a2fb-81f856b53001",
                  "creationTime": "Mar 5, 2015 1:10:52 PM",
                  "updateTime": "Mar 30, 2015 5:55:50 PM",
                  "createdBy": 10436,
                  "updatedBy": 10436,
                  "name": "no",
                  "label": "Nee",
                  "hidden": false,
                  "children": [],
                  "description": ""
                }
              ],
              "answerType": "SINGLE_SELECTION_RADIO",
              "mandatory": true,
              "horizontal": true,
              "description": ""
            },
            {
              "class": "com.biit.webforms.persistence.entity.Question",
              "comparationId": "3daf423a-c6fa-4930-9930-b5c342367235",
              "creationTime": "Jul 10, 2015 1:12:43 PM",
              "updateTime": "Oct 6, 2015 11:37:15 AM",
              "createdBy": 10436,
              "updatedBy": 10436,
              "name": "smoke_details",
              "label": "Hoeveel, hoelang:",
              "hidden": false,
              "children": [],
              "answerType": "TEXT_AREA",
              "mandatory": true,
              "horizontal": false,
              "description": ""
            },
            {
              "class": "com.biit.webforms.persistence.entity.Question",
              "comparationId": "dded9319-46fd-4df6-b6e5-50d2ae31089d",
              "creationTime": "Jun 2, 2015 1:22:29 PM",
              "updateTime": "May 16, 2016 9:52:55 AM",
              "createdBy": 10436,
              "updatedBy": 10436,
              "name": "allergic",
              "label": "Bent u allergisch voor bepaalde stoffen?",
              "hidden": false,
              "children": [
                {
                  "class": "com.biit.webforms.persistence.entity.Answer",
                  "comparationId": "1dad5c8d-c66e-4319-9f8a-383d3c2f2531",
                  "creationTime": "Jun 2, 2015 1:24:01 PM",
                  "updateTime": "Jun 2, 2015 1:27:16 PM",
                  "createdBy": 10436,
                  "updatedBy": 10436,
                  "name": "yes",
                  "label": "Ja",
                  "hidden": false,
                  "children": [],
                  "description": ""
                },
                {
                  "class": "com.biit.webforms.persistence.entity.Answer",
                  "comparationId": "caaad949-53e2-41c0-a9ee-03441a9eeb33",
                  "creationTime": "Jun 2, 2015 1:24:01 PM",
                  "updateTime": "Jun 2, 2015 1:27:26 PM",
                  "createdBy": 10436,
                  "updatedBy": 10436,
                  "name": "no",
                  "label": "Nee",
                  "hidden": false,
                  "children": [],
                  "description": ""
                }
              ],
              "answerType": "SINGLE_SELECTION_RADIO",
              "mandatory": true,
              "horizontal": true,
              "description": ""
            },
            {
              "class": "com.biit.webforms.persistence.entity.Question",
              "comparationId": "3910fe31-71ef-4c70-a037-91986d4a940a",
              "creationTime": "Jun 2, 2015 1:43:24 PM",
              "updateTime": "Oct 20, 2015 1:43:58 PM",
              "createdBy": 10436,
              "updatedBy": 10436,
              "name": "allergic_details",
              "label": "Geef details:",
              "hidden": false,
              "children": [],
              "answerType": "TEXT_AREA",
              "mandatory": true,
              "horizontal": false,
              "description": ""
            },
            {
              "class": "com.biit.webforms.persistence.entity.Text",
              "comparationId": "78a80562-3ac0-4cc9-8028-5f5719dcbada",
              "creationTime": "Oct 20, 2015 1:44:01 PM",
              "updateTime": "Oct 23, 2015 12:13:51 PM",
              "createdBy": 10436,
              "updatedBy": 10436,
              "name": "EndHealthStyle",
              "label": "Einde Algemene gezondheid",
              "hidden": false,
              "children": [],
              "description": "Einde Algemene gezondheid"
            }
          ]
        },
        {
          "class": "com.biit.webforms.persistence.entity.Category",
          "comparationId": "629bfe11-89c3-44a5-b8da-4eb2bfb16075",
          "creationTime": "Jun 2, 2015 1:45:33 PM",
          "updateTime": "May 16, 2016 9:52:56 AM",
          "createdBy": 10436,
          "updatedBy": 10436,
          "name": "Lausanne",
          "label": "Lausanne protocol",
          "hidden": false,
          "children": [
            {
              "class": "com.biit.webforms.persistence.entity.Question",
              "comparationId": "9c316b71-3d33-46dc-ab46-6be896925ff7",
              "creationTime": "Jun 2, 2015 1:47:04 PM",
              "updateTime": "May 16, 2016 9:52:56 AM",
              "createdBy": 10436,
              "updatedBy": 10436,
              "name": "unconscious",
              "label": "Bent u wel eens bewusteloos geraakt tijdens of na inspanning?",
              "hidden": false,
              "children": [
                {
                  "class": "com.biit.webforms.persistence.entity.Answer",
                  "comparationId": "fd1d4822-9d99-4a74-8c30-e852a8e748a1",
                  "creationTime": "Jun 2, 2015 1:48:23 PM",
                  "updateTime": "Jun 2, 2015 1:51:42 PM",
                  "createdBy": 10436,
                  "updatedBy": 10436,
                  "name": "yes",
                  "label": "Ja",
                  "hidden": false,
                  "children": [],
                  "description": ""
                },
                {
                  "class": "com.biit.webforms.persistence.entity.Answer",
                  "comparationId": "2aafbda1-92d9-48e7-97c1-212c08908a93",
                  "creationTime": "Jun 2, 2015 1:48:24 PM",
                  "updateTime": "Jun 2, 2015 1:51:51 PM",
                  "createdBy": 10436,
                  "updatedBy": 10436,
                  "name": "no",
                  "label": "Nee",
                  "hidden": false,
                  "children": [],
                  "description": ""
                }
              ],
              "answerType": "SINGLE_SELECTION_RADIO",
              "mandatory": true,
              "horizontal": true,
              "description": ""
            },
            {
              "class": "com.biit.webforms.persistence.entity.Question",
              "comparationId": "0c6d3d03-1076-42d7-a702-32b0aab07a86",
              "creationTime": "Jul 10, 2015 1:26:09 PM",
              "updateTime": "Jul 10, 2015 1:36:14 PM",
              "createdBy": 10436,
              "updatedBy": 10436,
              "name": "unconscious_details",
              "label": "Geef details:",
              "hidden": false,
              "children": [],
              "answerType": "TEXT_AREA",
              "mandatory": true,
              "horizontal": false,
              "description": ""
            },
            {
              "class": "com.biit.webforms.persistence.entity.Question",
              "comparationId": "7b58aeb0-350a-4399-bee4-deac036e280b",
              "creationTime": "Jun 2, 2015 1:47:05 PM",
              "updateTime": "May 16, 2016 9:52:56 AM",
              "createdBy": 10436,
              "updatedBy": 10436,
              "name": "dizziness",
              "label": "Heeft u wel eens klachten van duizeligheid tijdens inspanning?",
              "hidden": false,
              "children": [
                {
                  "class": "com.biit.webforms.persistence.entity.Answer",
                  "comparationId": "1f010c0f-0694-4f1a-bb38-7c0fef922eee",
                  "creationTime": "Jun 2, 2015 1:48:27 PM",
                  "updateTime": "Jun 2, 2015 1:51:58 PM",
                  "createdBy": 10436,
                  "updatedBy": 10436,
                  "name": "yes",
                  "label": "Ja",
                  "hidden": false,
                  "children": [],
                  "description": ""
                },
                {
                  "class": "com.biit.webforms.persistence.entity.Answer",
                  "comparationId": "70629a53-484d-4bf4-b8e8-273ef2af29f4",
                  "creationTime": "Jun 2, 2015 1:48:28 PM",
                  "updateTime": "Jun 2, 2015 1:52:05 PM",
                  "createdBy": 10436,
                  "updatedBy": 10436,
                  "name": "no",
                  "label": "Nee",
                  "hidden": false,
                  "children": [],
                  "description": ""
                }
              ],
              "answerType": "SINGLE_SELECTION_RADIO",
              "mandatory": true,
              "horizontal": true,
              "description": ""
            },
            {
              "class": "com.biit.webforms.persistence.entity.Question",
              "comparationId": "fb27ec09-2c9f-4412-926c-9a2112db82cf",
              "creationTime": "Jul 10, 2015 1:26:11 PM",
              "updateTime": "Jul 10, 2015 1:36:19 PM",
              "createdBy": 10436,
              "updatedBy": 10436,
              "name": "dizziness_details",
              "label": "Geef details:",
              "hidden": false,
              "children": [],
              "answerType": "TEXT_AREA",
              "mandatory": true,
              "horizontal": false,
              "description": ""
            },
            {
              "class": "com.biit.webforms.persistence.entity.Question",
              "comparationId": "294dfc4d-882d-4cea-8a8a-c794c0f583b4",
              "creationTime": "Jun 2, 2015 1:47:06 PM",
              "updateTime": "May 16, 2016 9:52:56 AM",
              "createdBy": 10436,
              "updatedBy": 10436,
              "name": "epilepsy",
              "label": "Heeft u wel eens last gehad van epilepsie?",
              "hidden": false,
              "children": [
                {
                  "class": "com.biit.webforms.persistence.entity.Answer",
                  "comparationId": "cd27bbe8-33e7-4858-ab7e-a08b8ee7813e",
                  "creationTime": "Jun 2, 2015 1:48:30 PM",
                  "updateTime": "Jun 2, 2015 1:52:12 PM",
                  "createdBy": 10436,
                  "updatedBy": 10436,
                  "name": "yes",
                  "label": "Ja",
                  "hidden": false,
                  "children": [],
                  "description": ""
                },
                {
                  "class": "com.biit.webforms.persistence.entity.Answer",
                  "comparationId": "1591bdbc-f6da-43c1-a037-4edcbef0efbb",
                  "creationTime": "Jun 2, 2015 1:48:31 PM",
                  "updateTime": "Jun 2, 2015 1:52:18 PM",
                  "createdBy": 10436,
                  "updatedBy": 10436,
                  "name": "no",
                  "label": "Nee",
                  "hidden": false,
                  "children": [],
                  "description": ""
                }
              ],
              "answerType": "SINGLE_SELECTION_RADIO",
              "mandatory": true,
              "horizontal": true,
              "description": ""
            },
            {
              "class": "com.biit.webforms.persistence.entity.Question",
              "comparationId": "8ca983e3-a6fc-4d05-9ff0-bbb0062dcc5c",
              "creationTime": "Jul 10, 2015 1:26:13 PM",
              "updateTime": "Jul 10, 2015 1:36:23 PM",
              "createdBy": 10436,
              "updatedBy": 10436,
              "name": "epilepsy_details",
              "label": "Geef details:",
              "hidden": false,
              "children": [],
              "answerType": "TEXT_AREA",
              "mandatory": true,
              "horizontal": false,
              "description": ""
            },
            {
              "class": "com.biit.webforms.persistence.entity.Question",
              "comparationId": "342e38c3-d73e-41b0-ab01-16cca3c1990e",
              "creationTime": "Jun 2, 2015 1:47:07 PM",
              "updateTime": "May 16, 2016 9:52:56 AM",
              "createdBy": 10436,
              "updatedBy": 10436,
              "name": "chestpain",
              "label": "Heeft u wel eens last van druk op de borst?",
              "hidden": false,
              "children": [
                {
                  "class": "com.biit.webforms.persistence.entity.Answer",
                  "comparationId": "26d0a15a-e29d-428d-8117-21b37ea3d49e",
                  "creationTime": "Jun 2, 2015 1:48:34 PM",
                  "updateTime": "Jun 2, 2015 1:52:29 PM",
                  "createdBy": 10436,
                  "updatedBy": 10436,
                  "name": "yes",
                  "label": "Ja",
                  "hidden": false,
                  "children": [],
                  "description": ""
                },
                {
                  "class": "com.biit.webforms.persistence.entity.Answer",
                  "comparationId": "91f8aa56-992d-4b62-b380-d5302c477f31",
                  "creationTime": "Jun 2, 2015 1:48:35 PM",
                  "updateTime": "Jun 2, 2015 1:52:36 PM",
                  "createdBy": 10436,
                  "updatedBy": 10436,
                  "name": "no",
                  "label": "Nee",
                  "hidden": false,
                  "children": [],
                  "description": ""
                }
              ],
              "answerType": "SINGLE_SELECTION_RADIO",
              "mandatory": true,
              "horizontal": true,
              "description": ""
            },
            {
              "class": "com.biit.webforms.persistence.entity.Question",
              "comparationId": "cc891f9c-1c6f-4456-bb8b-5487fa009333",
              "creationTime": "Jun 2, 2015 1:47:08 PM",
              "updateTime": "May 16, 2016 9:52:56 AM",
              "createdBy": 10436,
              "updatedBy": 10436,
              "name": "chestpain_extra",
              "label": "Kan dit gevoel uitgelokt worden door inspanning?",
              "hidden": false,
              "children": [
                {
                  "class": "com.biit.webforms.persistence.entity.Answer",
                  "comparationId": "90f42c4f-4dca-49fb-b8d9-aea5e318d16a",
                  "creationTime": "Jun 2, 2015 1:48:38 PM",
                  "updateTime": "Jun 2, 2015 1:52:46 PM",
                  "createdBy": 10436,
                  "updatedBy": 10436,
                  "name": "yes",
                  "label": "Ja",
                  "hidden": false,
                  "children": [],
                  "description": ""
                },
                {
                  "class": "com.biit.webforms.persistence.entity.Answer",
                  "comparationId": "649f983e-785b-4b6d-a1e0-2831f470b5e0",
                  "creationTime": "Jun 2, 2015 1:48:38 PM",
                  "updateTime": "Jun 2, 2015 1:52:52 PM",
                  "createdBy": 10436,
                  "updatedBy": 10436,
                  "name": "no",
                  "label": "Nee",
                  "hidden": false,
                  "children": [],
                  "description": ""
                }
              ],
              "answerType": "SINGLE_SELECTION_RADIO",
              "mandatory": true,
              "horizontal": true,
              "description": ""
            },
            {
              "class": "com.biit.webforms.persistence.entity.Question",
              "comparationId": "f14ed771-86f2-41ba-851e-ab4f44c929f2",
              "creationTime": "Jul 10, 2015 1:26:17 PM",
              "updateTime": "Jul 10, 2015 2:00:03 PM",
              "createdBy": 10436,
              "updatedBy": 10436,
              "name": "chestpain_details",
              "label": "Geef details:",
              "hidden": false,
              "children": [],
              "answerType": "TEXT_AREA",
              "mandatory": true,
              "horizontal": false,
              "description": ""
            },
            {
              "class": "com.biit.webforms.persistence.entity.Question",
              "comparationId": "38d38703-f6fe-42db-8e42-a17106b1d847",
              "creationTime": "Jun 2, 2015 1:47:08 PM",
              "updateTime": "May 16, 2016 9:52:56 AM",
              "createdBy": 10436,
              "updatedBy": 10436,
              "name": "exhausted",
              "label": "Heeft u wel eens klachten van een extreme vermoeidheid die niet past bij het inspanningsniveau?",
              "hidden": false,
              "children": [
                {
                  "class": "com.biit.webforms.persistence.entity.Answer",
                  "comparationId": "a0fc3ce7-851e-4776-be13-4ddd5048622d",
                  "creationTime": "Jun 2, 2015 1:49:20 PM",
                  "updateTime": "Jun 2, 2015 1:52:59 PM",
                  "createdBy": 10436,
                  "updatedBy": 10436,
                  "name": "yes",
                  "label": "Ja",
                  "hidden": false,
                  "children": [],
                  "description": ""
                },
                {
                  "class": "com.biit.webforms.persistence.entity.Answer",
                  "comparationId": "cdcfddfb-a91c-44b4-8fab-075b9a2ccb77",
                  "creationTime": "Jun 2, 2015 1:49:21 PM",
                  "updateTime": "Jun 2, 2015 1:53:05 PM",
                  "createdBy": 10436,
                  "updatedBy": 10436,
                  "name": "no",
                  "label": "Nee",
                  "hidden": false,
                  "children": [],
                  "description": ""
                }
              ],
              "answerType": "SINGLE_SELECTION_RADIO",
              "mandatory": true,
              "horizontal": true,
              "description": ""
            },
            {
              "class": "com.biit.webforms.persistence.entity.Question",
              "comparationId": "d186d320-eaec-408b-87a4-cb35fb203ea5",
              "creationTime": "Jul 10, 2015 1:26:19 PM",
              "updateTime": "Jul 10, 2015 1:36:39 PM",
              "createdBy": 10436,
              "updatedBy": 10436,
              "name": "exhausted_details",
              "label": "Geef details:",
              "hidden": false,
              "children": [],
              "answerType": "TEXT_AREA",
              "mandatory": true,
              "horizontal": false,
              "description": ""
            },
            {
              "class": "com.biit.webforms.persistence.entity.Question",
              "comparationId": "e8010b6a-16f7-40df-ae3d-334f176ed1bd",
              "creationTime": "Jun 2, 2015 1:47:09 PM",
              "updateTime": "May 16, 2016 9:52:56 AM",
              "createdBy": 10436,
              "updatedBy": 10436,
              "name": "palpitations",
              "label": "Heeft u wel eens last van hartkloppingen?",
              "hidden": false,
              "children": [
                {
                  "class": "com.biit.webforms.persistence.entity.Answer",
                  "comparationId": "cade9b17-f59c-4534-8807-468afc447a6f",
                  "creationTime": "Jun 2, 2015 1:49:23 PM",
                  "updateTime": "Jun 2, 2015 1:53:11 PM",
                  "createdBy": 10436,
                  "updatedBy": 10436,
                  "name": "yes",
                  "label": "Ja",
                  "hidden": false,
                  "children": [],
                  "description": ""
                },
                {
                  "class": "com.biit.webforms.persistence.entity.Answer",
                  "comparationId": "b757ef83-893a-4d44-8a75-4e346d533062",
                  "creationTime": "Jun 2, 2015 1:49:24 PM",
                  "updateTime": "Jun 2, 2015 1:53:19 PM",
                  "createdBy": 10436,
                  "updatedBy": 10436,
                  "name": "no",
                  "label": "Nee",
                  "hidden": false,
                  "children": [],
                  "description": ""
                }
              ],
              "answerType": "SINGLE_SELECTION_RADIO",
              "mandatory": true,
              "horizontal": true,
              "description": ""
            },
            {
              "class": "com.biit.webforms.persistence.entity.Question",
              "comparationId": "f4d71055-ff32-4875-9813-67e1a1302dd9",
              "creationTime": "Jul 10, 2015 1:26:21 PM",
              "updateTime": "Jul 10, 2015 1:36:44 PM",
              "createdBy": 10436,
              "updatedBy": 10436,
              "name": "palpitations_details",
              "label": "Geef details:",
              "hidden": false,
              "children": [],
              "answerType": "TEXT_AREA",
              "mandatory": true,
              "horizontal": false,
              "description": ""
            },
            {
              "class": "com.biit.webforms.persistence.entity.Question",
              "comparationId": "ca8d278f-7692-48cd-87f1-1c3fc026046d",
              "creationTime": "Jun 2, 2015 1:47:10 PM",
              "updateTime": "May 16, 2016 9:52:56 AM",
              "createdBy": 10436,
              "updatedBy": 10436,
              "name": "arrhythmia",
              "label": "Heeft u hartritmestoornissen?",
              "hidden": false,
              "children": [
                {
                  "class": "com.biit.webforms.persistence.entity.Answer",
                  "comparationId": "1e1a803c-531a-4bfc-88c7-8efc34659607",
                  "creationTime": "Jun 2, 2015 1:49:26 PM",
                  "updateTime": "Jun 2, 2015 1:53:26 PM",
                  "createdBy": 10436,
                  "updatedBy": 10436,
                  "name": "yes",
                  "label": "Ja",
                  "hidden": false,
                  "children": [],
                  "description": ""
                },
                {
                  "class": "com.biit.webforms.persistence.entity.Answer",
                  "comparationId": "d42dd157-797b-458b-ab5b-f28c73aebda9",
                  "creationTime": "Jun 2, 2015 1:49:27 PM",
                  "updateTime": "Jun 2, 2015 1:53:34 PM",
                  "createdBy": 10436,
                  "updatedBy": 10436,
                  "name": "no",
                  "label": "Nee",
                  "hidden": false,
                  "children": [],
                  "description": ""
                }
              ],
              "answerType": "SINGLE_SELECTION_RADIO",
              "mandatory": true,
              "horizontal": true,
              "description": ""
            },
            {
              "class": "com.biit.webforms.persistence.entity.Question",
              "comparationId": "9f6250ba-eae6-48b7-bac2-0865901e59cb",
              "creationTime": "Jul 10, 2015 1:26:22 PM",
              "updateTime": "Jul 10, 2015 1:36:50 PM",
              "createdBy": 10436,
              "updatedBy": 10436,
              "name": "arrhythmia_details",
              "label": "Geef details:",
              "hidden": false,
              "children": [],
              "answerType": "TEXT_AREA",
              "mandatory": true,
              "horizontal": false,
              "description": ""
            },
            {
              "class": "com.biit.webforms.persistence.entity.Question",
              "comparationId": "7b2a48cc-a626-41f5-aac8-b15acd270977",
              "creationTime": "Jun 2, 2015 1:47:11 PM",
              "updateTime": "May 16, 2016 9:52:56 AM",
              "createdBy": 10436,
              "updatedBy": 10436,
              "name": "heartmurmurs",
              "label": "Heeft u een hartgeruis?",
              "hidden": false,
              "children": [
                {
                  "class": "com.biit.webforms.persistence.entity.Answer",
                  "comparationId": "c7a307f5-923f-4771-919a-aca3958a9a78",
                  "creationTime": "Jun 2, 2015 1:49:30 PM",
                  "updateTime": "Jun 2, 2015 1:53:40 PM",
                  "createdBy": 10436,
                  "updatedBy": 10436,
                  "name": "yes",
                  "label": "Ja",
                  "hidden": false,
                  "children": [],
                  "description": ""
                },
                {
                  "class": "com.biit.webforms.persistence.entity.Answer",
                  "comparationId": "d8f5ae13-3df9-48b4-ac57-66e152d6bb4a",
                  "creationTime": "Jun 2, 2015 1:49:31 PM",
                  "updateTime": "Jun 2, 2015 1:53:46 PM",
                  "createdBy": 10436,
                  "updatedBy": 10436,
                  "name": "no",
                  "label": "Nee",
                  "hidden": false,
                  "children": [],
                  "description": ""
                }
              ],
              "answerType": "SINGLE_SELECTION_RADIO",
              "mandatory": true,
              "horizontal": true,
              "description": ""
            },
            {
              "class": "com.biit.webforms.persistence.entity.Question",
              "comparationId": "38677330-3f30-4307-b1b3-3dc6fd84fc0d",
              "creationTime": "Jul 10, 2015 1:26:24 PM",
              "updateTime": "Jul 10, 2015 1:36:56 PM",
              "createdBy": 10436,
              "updatedBy": 10436,
              "name": "heartmurmurs_details",
              "label": "Geef details:",
              "hidden": false,
              "children": [],
              "answerType": "TEXT_AREA",
              "mandatory": true,
              "horizontal": false,
              "description": ""
            },
            {
              "class": "com.biit.webforms.persistence.entity.Question",
              "comparationId": "4618d5ee-f7e5-4cba-b3d1-96fa47b86e6d",
              "creationTime": "Jun 2, 2015 1:47:12 PM",
              "updateTime": "May 16, 2016 9:52:56 AM",
              "createdBy": 10436,
              "updatedBy": 10436,
              "name": "cardiopathy",
              "label": "Heeft u last van een andere hartaandoening?",
              "hidden": false,
              "children": [
                {
                  "class": "com.biit.webforms.persistence.entity.Answer",
                  "comparationId": "a0fc8f23-c2b2-477e-be42-be082f0e6363",
                  "creationTime": "Jun 2, 2015 1:49:34 PM",
                  "updateTime": "Jun 2, 2015 1:53:53 PM",
                  "createdBy": 10436,
                  "updatedBy": 10436,
                  "name": "yes",
                  "label": "Ja",
                  "hidden": false,
                  "children": [],
                  "description": ""
                },
                {
                  "class": "com.biit.webforms.persistence.entity.Answer",
                  "comparationId": "d9e57de7-b8ac-4e96-9bde-1e93f7fdd163",
                  "creationTime": "Jun 2, 2015 1:49:34 PM",
                  "updateTime": "Jun 2, 2015 1:54:03 PM",
                  "createdBy": 10436,
                  "updatedBy": 10436,
                  "name": "no",
                  "label": "Nee",
                  "hidden": false,
                  "children": [],
                  "description": ""
                }
              ],
              "answerType": "SINGLE_SELECTION_RADIO",
              "mandatory": true,
              "horizontal": true,
              "description": ""
            },
            {
              "class": "com.biit.webforms.persistence.entity.Question",
              "comparationId": "f61b00e1-a3c2-46a2-ad9f-99a5ce79d54b",
              "creationTime": "Jul 10, 2015 1:26:26 PM",
              "updateTime": "Jul 10, 2015 1:37:03 PM",
              "createdBy": 10436,
              "updatedBy": 10436,
              "name": "cardiopathy_details",
              "label": "Geef details:",
              "hidden": false,
              "children": [],
              "answerType": "TEXT_AREA",
              "mandatory": true,
              "horizontal": false,
              "description": ""
            },
            {
              "class": "com.biit.webforms.persistence.entity.Question",
              "comparationId": "cb691a64-2fa5-4db0-a048-6dab67cfcac3",
              "creationTime": "Jun 2, 2015 1:47:13 PM",
              "updateTime": "May 16, 2016 9:52:56 AM",
              "createdBy": 10436,
              "updatedBy": 10436,
              "name": "dyspnoea",
              "label": "Heeft u tijdens inspanning wel eens last van extreme kortademigheid of hoestbuien?",
              "hidden": false,
              "children": [
                {
                  "class": "com.biit.webforms.persistence.entity.Answer",
                  "comparationId": "aedb175d-5f7f-4830-8ec7-9e7cf90a885f",
                  "creationTime": "Jun 2, 2015 1:49:38 PM",
                  "updateTime": "Jun 2, 2015 1:54:09 PM",
                  "createdBy": 10436,
                  "updatedBy": 10436,
                  "name": "yes",
                  "label": "Ja",
                  "hidden": false,
                  "children": [],
                  "description": ""
                },
                {
                  "class": "com.biit.webforms.persistence.entity.Answer",
                  "comparationId": "d9ab5fc0-3777-429c-9dbf-1351895774a6",
                  "creationTime": "Jun 2, 2015 1:49:39 PM",
                  "updateTime": "Jun 2, 2015 1:54:17 PM",
                  "createdBy": 10436,
                  "updatedBy": 10436,
                  "name": "no",
                  "label": "Nee",
                  "hidden": false,
                  "children": [],
                  "description": ""
                }
              ],
              "answerType": "SINGLE_SELECTION_RADIO",
              "mandatory": true,
              "horizontal": true,
              "description": ""
            },
            {
              "class": "com.biit.webforms.persistence.entity.Question",
              "comparationId": "5bfbfbb0-2cf9-4996-9c77-599bd5e2886d",
              "creationTime": "Jul 10, 2015 1:26:27 PM",
              "updateTime": "Jul 10, 2015 1:37:09 PM",
              "createdBy": 10436,
              "updatedBy": 10436,
              "name": "dyspnoea_details",
              "label": "Geef details:",
              "hidden": false,
              "children": [],
              "answerType": "TEXT_AREA",
              "mandatory": true,
              "horizontal": false,
              "description": ""
            },
            {
              "class": "com.biit.webforms.persistence.entity.Question",
              "comparationId": "2136c398-8d1c-4012-8175-916927334d1b",
              "creationTime": "Jun 2, 2015 1:47:13 PM",
              "updateTime": "May 16, 2016 9:52:56 AM",
              "createdBy": 10436,
              "updatedBy": 10436,
              "name": "astma",
              "label": "Heeft u klachten van astma of een andere luchtwegaandoening (gehad), waarvoor u behandeld moe(s)t worden?",
              "hidden": false,
              "children": [
                {
                  "class": "com.biit.webforms.persistence.entity.Answer",
                  "comparationId": "110e7b33-f886-4e6b-ad23-a034fe515c20",
                  "creationTime": "Jun 2, 2015 1:49:42 PM",
                  "updateTime": "Jun 2, 2015 1:54:27 PM",
                  "createdBy": 10436,
                  "updatedBy": 10436,
                  "name": "yes",
                  "label": "Ja",
                  "hidden": false,
                  "children": [],
                  "description": ""
                },
                {
                  "class": "com.biit.webforms.persistence.entity.Answer",
                  "comparationId": "aa108abd-d4fa-4f80-832a-b1bd20615381",
                  "creationTime": "Jun 2, 2015 1:49:43 PM",
                  "updateTime": "Jun 2, 2015 1:54:36 PM",
                  "createdBy": 10436,
                  "updatedBy": 10436,
                  "name": "no",
                  "label": "Nee",
                  "hidden": false,
                  "children": [],
                  "description": ""
                }
              ],
              "answerType": "SINGLE_SELECTION_RADIO",
              "mandatory": true,
              "horizontal": true,
              "description": ""
            },
            {
              "class": "com.biit.webforms.persistence.entity.Question",
              "comparationId": "9e605593-d4dd-4ab7-bdce-ef62d8e00a31",
              "creationTime": "Jul 10, 2015 1:26:29 PM",
              "updateTime": "Jul 10, 2015 1:37:15 PM",
              "createdBy": 10436,
              "updatedBy": 10436,
              "name": "astma_details",
              "label": "Geef details:",
              "hidden": false,
              "children": [],
              "answerType": "TEXT_AREA",
              "mandatory": true,
              "horizontal": false,
              "description": ""
            },
            {
              "class": "com.biit.webforms.persistence.entity.Question",
              "comparationId": "a19538a2-5ea8-400f-8730-87d85f455668",
              "creationTime": "Jun 2, 2015 1:47:14 PM",
              "updateTime": "May 16, 2016 9:52:56 AM",
              "createdBy": 10436,
              "updatedBy": 10436,
              "name": "virusinfection",
              "label": "Is er recent bij u een virusinfectie aangetoond (bijvoorbeeld ziekte van Pfeiffer)?",
              "hidden": false,
              "children": [
                {
                  "class": "com.biit.webforms.persistence.entity.Answer",
                  "comparationId": "3ac21b1f-cb06-442e-ae25-850769a91d0f",
                  "creationTime": "Jun 2, 2015 1:49:48 PM",
                  "updateTime": "Jun 2, 2015 1:54:44 PM",
                  "createdBy": 10436,
                  "updatedBy": 10436,
                  "name": "yes",
                  "label": "Ja",
                  "hidden": false,
                  "children": [],
                  "description": ""
                },
                {
                  "class": "com.biit.webforms.persistence.entity.Answer",
                  "comparationId": "82ea3c61-ae8c-49cf-8710-95c7966b3a5e",
                  "creationTime": "Jun 2, 2015 1:49:49 PM",
                  "updateTime": "Jun 2, 2015 1:55:46 PM",
                  "createdBy": 10436,
                  "updatedBy": 10436,
                  "name": "no",
                  "label": "Nee",
                  "hidden": false,
                  "children": [],
                  "description": ""
                }
              ],
              "answerType": "SINGLE_SELECTION_RADIO",
              "mandatory": true,
              "horizontal": true,
              "description": ""
            },
            {
              "class": "com.biit.webforms.persistence.entity.Question",
              "comparationId": "e2e72bcd-70d0-4f91-9bf2-1ad93a8817b1",
              "creationTime": "Jul 10, 2015 1:26:31 PM",
              "updateTime": "Jul 10, 2015 1:37:23 PM",
              "createdBy": 10436,
              "updatedBy": 10436,
              "name": "virusinfection_details",
              "label": "Geef details:",
              "hidden": false,
              "children": [],
              "answerType": "TEXT_AREA",
              "mandatory": true,
              "horizontal": false,
              "description": ""
            },
            {
              "class": "com.biit.webforms.persistence.entity.Question",
              "comparationId": "1ff5bc4e-2f84-4434-b703-488f8fe50cbc",
              "creationTime": "Jun 2, 2015 1:47:15 PM",
              "updateTime": "May 16, 2016 9:52:56 AM",
              "createdBy": 10436,
              "updatedBy": 10436,
              "name": "rheumatism",
              "label": "Heeft u vroeger acuut reuma gehad?",
              "hidden": false,
              "children": [
                {
                  "class": "com.biit.webforms.persistence.entity.Answer",
                  "comparationId": "da32a3ed-f1bd-48b2-b813-d65b24fdd22c",
                  "creationTime": "Jun 2, 2015 1:49:53 PM",
                  "updateTime": "Jun 2, 2015 1:54:59 PM",
                  "createdBy": 10436,
                  "updatedBy": 10436,
                  "name": "yes",
                  "label": "Ja",
                  "hidden": false,
                  "children": [],
                  "description": ""
                },
                {
                  "class": "com.biit.webforms.persistence.entity.Answer",
                  "comparationId": "04cb85dc-6b17-4476-9bb8-822406fe0d81",
                  "creationTime": "Jun 2, 2015 1:49:54 PM",
                  "updateTime": "Jun 2, 2015 1:55:06 PM",
                  "createdBy": 10436,
                  "updatedBy": 10436,
                  "name": "no",
                  "label": "Nee",
                  "hidden": false,
                  "children": [],
                  "description": ""
                }
              ],
              "answerType": "SINGLE_SELECTION_RADIO",
              "mandatory": true,
              "horizontal": true,
              "description": ""
            },
            {
              "class": "com.biit.webforms.persistence.entity.Question",
              "comparationId": "18c21862-b094-4d7b-8d66-105091fc61c1",
              "creationTime": "Jul 10, 2015 1:26:33 PM",
              "updateTime": "Jul 10, 2015 1:37:30 PM",
              "createdBy": 10436,
              "updatedBy": 10436,
              "name": "rheumatism_details",
              "label": "Geef details:",
              "hidden": false,
              "children": [],
              "answerType": "TEXT_AREA",
              "mandatory": true,
              "horizontal": false,
              "description": ""
            },
            {
              "class": "com.biit.webforms.persistence.entity.Question",
              "comparationId": "e542cb5e-a7b7-46c7-86f3-09ecc3173966",
              "creationTime": "Jun 2, 2015 1:47:16 PM",
              "updateTime": "May 16, 2016 9:52:56 AM",
              "createdBy": 10436,
              "updatedBy": 10436,
              "name": "high_blood_pressure",
              "label": "Heeft u last van een hoge bloeddruk?",
              "hidden": false,
              "children": [
                {
                  "class": "com.biit.webforms.persistence.entity.Answer",
                  "comparationId": "66495354-6165-4505-967c-662f81ff95df",
                  "creationTime": "Jun 2, 2015 1:51:24 PM",
                  "updateTime": "Jun 2, 2015 1:55:16 PM",
                  "createdBy": 10436,
                  "updatedBy": 10436,
                  "name": "yes",
                  "label": "Ja",
                  "hidden": false,
                  "children": [],
                  "description": ""
                },
                {
                  "class": "com.biit.webforms.persistence.entity.Answer",
                  "comparationId": "04784bfe-6023-4aef-833a-145fe3702247",
                  "creationTime": "Jun 2, 2015 1:51:24 PM",
                  "updateTime": "Jun 2, 2015 1:55:23 PM",
                  "createdBy": 10436,
                  "updatedBy": 10436,
                  "name": "no",
                  "label": "Nee",
                  "hidden": false,
                  "children": [],
                  "description": ""
                }
              ],
              "answerType": "SINGLE_SELECTION_RADIO",
              "mandatory": true,
              "horizontal": true,
              "description": ""
            },
            {
              "class": "com.biit.webforms.persistence.entity.Question",
              "comparationId": "f2feb3c3-592d-4dd4-97d1-74167bdfa031",
              "creationTime": "Jul 10, 2015 1:26:35 PM",
              "updateTime": "Jul 10, 2015 1:37:48 PM",
              "createdBy": 10436,
              "updatedBy": 10436,
              "name": "high_blood_pressure_details",
              "label": "Geef details:",
              "hidden": false,
              "children": [],
              "answerType": "TEXT_AREA",
              "mandatory": true,
              "horizontal": false,
              "description": ""
            },
            {
              "class": "com.biit.webforms.persistence.entity.Question",
              "comparationId": "6e6eb222-1c62-45d1-ba0b-c569bb967671",
              "creationTime": "Jun 2, 2015 1:47:16 PM",
              "updateTime": "May 16, 2016 9:52:56 AM",
              "createdBy": 10436,
              "updatedBy": 10436,
              "name": "high_cholesterol",
              "label": "Heeft u last van een te hoog cholesterol?",
              "hidden": false,
              "children": [
                {
                  "class": "com.biit.webforms.persistence.entity.Answer",
                  "comparationId": "07f60c87-b219-4c36-a0da-e27dd042657c",
                  "creationTime": "Jun 2, 2015 1:51:28 PM",
                  "updateTime": "Jun 2, 2015 1:55:40 PM",
                  "createdBy": 10436,
                  "updatedBy": 10436,
                  "name": "yes",
                  "label": "Ja",
                  "hidden": false,
                  "children": [],
                  "description": ""
                },
                {
                  "class": "com.biit.webforms.persistence.entity.Answer",
                  "comparationId": "b05170d8-45f3-4905-9632-5b2c4d42e9f2",
                  "creationTime": "Jun 2, 2015 1:51:28 PM",
                  "updateTime": "Jun 2, 2015 1:55:36 PM",
                  "createdBy": 10436,
                  "updatedBy": 10436,
                  "name": "no",
                  "label": "Nee",
                  "hidden": false,
                  "children": [],
                  "description": ""
                }
              ],
              "answerType": "SINGLE_SELECTION_RADIO",
              "mandatory": true,
              "horizontal": true,
              "description": ""
            },
            {
              "class": "com.biit.webforms.persistence.entity.Question",
              "comparationId": "8119af4f-4444-4ce2-bbe5-3ed9d7fe0379",
              "creationTime": "Jul 10, 2015 1:26:37 PM",
              "updateTime": "Jul 10, 2015 1:37:43 PM",
              "createdBy": 10436,
              "updatedBy": 10436,
              "name": "high_cholesterol_details",
              "label": "Geef details:",
              "hidden": false,
              "children": [],
              "answerType": "TEXT_AREA",
              "mandatory": true,
              "horizontal": false,
              "description": ""
            },
            {
              "class": "com.biit.webforms.persistence.entity.Text",
              "comparationId": "f8139af5-20bd-45fb-88f1-53a31e1cf5c8",
              "creationTime": "Oct 20, 2015 1:47:42 PM",
              "updateTime": "Oct 20, 2015 1:48:18 PM",
              "createdBy": 10436,
              "updatedBy": 10436,
              "name": "EndLausanne",
              "label": "Einde Lausanne Protocol",
              "hidden": false,
              "children": [],
              "description": "Einde Lausanne Protocol"
            }
          ]
        },
        {
          "class": "com.biit.webforms.persistence.entity.Category",
          "comparationId": "895edb96-67e8-4cf9-8914-146ade08720f",
          "creationTime": "Jun 2, 2015 1:45:32 PM",
          "updateTime": "Jul 3, 2017 9:37:55 AM",
          "createdBy": 10436,
          "updatedBy": 10436,
          "name": "FamilyHistoryAnamnesis",
          "label": "Familie anamnese",
          "hidden": false,
          "children": [
            {
              "class": "com.biit.webforms.persistence.entity.Question",
              "comparationId": "ee1abe86-6f7f-44be-8868-fc4150a34d10",
              "creationTime": "Jun 2, 2015 3:36:05 PM",
              "updateTime": "May 16, 2016 9:52:56 AM",
              "createdBy": 10436,
              "updatedBy": 10436,
              "name": "early_death",
              "label": "Is er bij u in de familie wel eens op jonge leeftijd iemand acuut onverklaard overleden?",
              "hidden": false,
              "children": [
                {
                  "class": "com.biit.webforms.persistence.entity.Answer",
                  "comparationId": "f28911e7-d75a-48aa-b52d-1b321dc032e9",
                  "creationTime": "Jun 2, 2015 3:39:30 PM",
                  "updateTime": "Jun 2, 2015 3:40:28 PM",
                  "createdBy": 10436,
                  "updatedBy": 10436,
                  "name": "yes",
                  "label": "Ja",
                  "hidden": false,
                  "children": [],
                  "description": ""
                },
                {
                  "class": "com.biit.webforms.persistence.entity.Answer",
                  "comparationId": "dae9e9af-ddc1-4a28-9b82-2d23fe819a68",
                  "creationTime": "Jun 2, 2015 3:39:31 PM",
                  "updateTime": "Jun 2, 2015 3:40:34 PM",
                  "createdBy": 10436,
                  "updatedBy": 10436,
                  "name": "no",
                  "label": "Nee",
                  "hidden": false,
                  "children": [],
                  "description": ""
                }
              ],
              "answerType": "SINGLE_SELECTION_RADIO",
              "mandatory": true,
              "horizontal": true,
              "description": ""
            },
            {
              "class": "com.biit.webforms.persistence.entity.Question",
              "comparationId": "0fcbfb46-9838-4dd5-9fd4-f58386302bc1",
              "creationTime": "Jul 10, 2015 1:36:04 PM",
              "updateTime": "Jul 10, 2015 1:45:44 PM",
              "createdBy": 10436,
              "updatedBy": 10436,
              "name": "early_death_details",
              "label": "Geef details:",
              "hidden": false,
              "children": [],
              "answerType": "TEXT_AREA",
              "mandatory": true,
              "horizontal": false,
              "description": ""
            },
            {
              "class": "com.biit.webforms.persistence.entity.Question",
              "comparationId": "21b70fb0-e01e-4440-b53d-dcf19ab3128d",
              "creationTime": "Jun 2, 2015 3:36:06 PM",
              "updateTime": "May 16, 2016 9:52:56 AM",
              "createdBy": 10436,
              "updatedBy": 10436,
              "name": "fainting",
              "label": "Is er bij u in de familie iemand bekend die regelmatig flauwvalt?",
              "hidden": false,
              "children": [
                {
                  "class": "com.biit.webforms.persistence.entity.Answer",
                  "comparationId": "700c0f99-c793-4dfd-ac5f-71cea475571d",
                  "creationTime": "Jun 2, 2015 3:39:33 PM",
                  "updateTime": "Jun 2, 2015 3:40:42 PM",
                  "createdBy": 10436,
                  "updatedBy": 10436,
                  "name": "yes",
                  "label": "Ja",
                  "hidden": false,
                  "children": [],
                  "description": ""
                },
                {
                  "class": "com.biit.webforms.persistence.entity.Answer",
                  "comparationId": "fb866b3c-b01f-4421-aa82-46d21cb1ac72",
                  "creationTime": "Jun 2, 2015 3:39:34 PM",
                  "updateTime": "Jun 2, 2015 3:40:49 PM",
                  "createdBy": 10436,
                  "updatedBy": 10436,
                  "name": "no",
                  "label": "Nee",
                  "hidden": false,
                  "children": [],
                  "description": ""
                }
              ],
              "answerType": "SINGLE_SELECTION_RADIO",
              "mandatory": true,
              "horizontal": true,
              "description": ""
            },
            {
              "class": "com.biit.webforms.persistence.entity.Question",
              "comparationId": "87267c70-9cb0-4889-82b3-514d78868ab7",
              "creationTime": "Jul 10, 2015 1:38:02 PM",
              "updateTime": "Jul 10, 2015 1:45:48 PM",
              "createdBy": 10436,
              "updatedBy": 10436,
              "name": "fainting_details",
              "label": "Geef details:",
              "hidden": false,
              "children": [],
              "answerType": "TEXT_AREA",
              "mandatory": true,
              "horizontal": false,
              "description": ""
            },
            {
              "class": "com.biit.webforms.persistence.entity.Question",
              "comparationId": "b0190d47-b7a4-4836-9374-b3ac6fcbce90",
              "creationTime": "Jun 2, 2015 3:36:07 PM",
              "updateTime": "May 16, 2016 9:52:56 AM",
              "createdBy": 10436,
              "updatedBy": 10436,
              "name": "absences",
              "label": "Is er bij u in de familie iemand met onverklaarde trekkingen of periodes van afwezigheid?",
              "hidden": false,
              "children": [
                {
                  "class": "com.biit.webforms.persistence.entity.Answer",
                  "comparationId": "f63d6e56-360e-47cd-b24d-c169e42e58c9",
                  "creationTime": "Jun 2, 2015 3:39:36 PM",
                  "updateTime": "Jun 2, 2015 3:40:57 PM",
                  "createdBy": 10436,
                  "updatedBy": 10436,
                  "name": "yes",
                  "label": "Ja",
                  "hidden": false,
                  "children": [],
                  "description": ""
                },
                {
                  "class": "com.biit.webforms.persistence.entity.Answer",
                  "comparationId": "d9a5440f-0b5a-4b78-acb9-92e1dfe88180",
                  "creationTime": "Jun 2, 2015 3:39:36 PM",
                  "updateTime": "Jun 2, 2015 3:41:03 PM",
                  "createdBy": 10436,
                  "updatedBy": 10436,
                  "name": "no",
                  "label": "Nee",
                  "hidden": false,
                  "children": [],
                  "description": ""
                }
              ],
              "answerType": "SINGLE_SELECTION_RADIO",
              "mandatory": true,
              "horizontal": true,
              "description": ""
            },
            {
              "class": "com.biit.webforms.persistence.entity.Question",
              "comparationId": "a3c6faaa-685b-48ec-9b52-4daffee81dca",
              "creationTime": "Jul 10, 2015 1:38:03 PM",
              "updateTime": "Jul 10, 2015 1:45:52 PM",
              "createdBy": 10436,
              "updatedBy": 10436,
              "name": "absences_details",
              "label": "Geef details:",
              "hidden": false,
              "children": [],
              "answerType": "TEXT_AREA",
              "mandatory": true,
              "horizontal": false,
              "description": ""
            },
            {
              "class": "com.biit.webforms.persistence.entity.Question",
              "comparationId": "ddac3f8d-5abb-4862-bd5e-e0c76e919f4a",
              "creationTime": "Jun 2, 2015 3:36:08 PM",
              "updateTime": "May 16, 2016 9:52:56 AM",
              "createdBy": 10436,
              "updatedBy": 10436,
              "name": "drowning",
              "label": "Is er bij u in de familie iemand onverklaard verdronken?",
              "hidden": false,
              "children": [
                {
                  "class": "com.biit.webforms.persistence.entity.Answer",
                  "comparationId": "868bbb4f-6e26-457f-85a4-3f423488c2e4",
                  "creationTime": "Jun 2, 2015 3:39:40 PM",
                  "updateTime": "Jun 2, 2015 3:41:12 PM",
                  "createdBy": 10436,
                  "updatedBy": 10436,
                  "name": "yes",
                  "label": "Ja",
                  "hidden": false,
                  "children": [],
                  "description": ""
                },
                {
                  "class": "com.biit.webforms.persistence.entity.Answer",
                  "comparationId": "764580fd-aba3-402b-b604-a671e35a7f4a",
                  "creationTime": "Jun 2, 2015 3:39:40 PM",
                  "updateTime": "Jun 2, 2015 3:41:19 PM",
                  "createdBy": 10436,
                  "updatedBy": 10436,
                  "name": "no",
                  "label": "Nee",
                  "hidden": false,
                  "children": [],
                  "description": ""
                }
              ],
              "answerType": "SINGLE_SELECTION_RADIO",
              "mandatory": true,
              "horizontal": true,
              "description": ""
            },
            {
              "class": "com.biit.webforms.persistence.entity.Question",
              "comparationId": "fde7d131-c180-43ce-84b3-270da64f1a6a",
              "creationTime": "Jul 10, 2015 1:38:04 PM",
              "updateTime": "Jul 10, 2015 1:45:56 PM",
              "createdBy": 10436,
              "updatedBy": 10436,
              "name": "drowning_details",
              "label": "Geef details:",
              "hidden": false,
              "children": [],
              "answerType": "TEXT_AREA",
              "mandatory": true,
              "horizontal": false,
              "description": ""
            },
            {
              "class": "com.biit.webforms.persistence.entity.Question",
              "comparationId": "12ec46fa-0ce2-460f-9ce2-076b5bf48a78",
              "creationTime": "Jun 2, 2015 3:36:09 PM",
              "updateTime": "May 16, 2016 9:52:56 AM",
              "createdBy": 10436,
              "updatedBy": 10436,
              "name": "traffic_accidents",
              "label": "Is er bij u in de familie onverklaard omgekomen in het verkeer?",
              "hidden": false,
              "children": [
                {
                  "class": "com.biit.webforms.persistence.entity.Answer",
                  "comparationId": "05308d2a-620f-4404-aa16-76b5d4fcac7f",
                  "creationTime": "Jun 2, 2015 3:39:43 PM",
                  "updateTime": "Jun 2, 2015 3:41:35 PM",
                  "createdBy": 10436,
                  "updatedBy": 10436,
                  "name": "yes",
                  "label": "Ja",
                  "hidden": false,
                  "children": [],
                  "description": ""
                },
                {
                  "class": "com.biit.webforms.persistence.entity.Answer",
                  "comparationId": "133ba56e-92a9-44fc-8f26-5ffc705d95cf",
                  "creationTime": "Jun 2, 2015 3:39:43 PM",
                  "updateTime": "Jun 2, 2015 3:41:40 PM",
                  "createdBy": 10436,
                  "updatedBy": 10436,
                  "name": "no",
                  "label": "Nee",
                  "hidden": false,
                  "children": [],
                  "description": ""
                }
              ],
              "answerType": "SINGLE_SELECTION_RADIO",
              "mandatory": true,
              "horizontal": true,
              "description": ""
            },
            {
              "class": "com.biit.webforms.persistence.entity.Question",
              "comparationId": "3a78f301-9b42-4467-a2ba-c3f03c129954",
              "creationTime": "Jul 10, 2015 1:38:05 PM",
              "updateTime": "Jul 10, 2015 1:45:59 PM",
              "createdBy": 10436,
              "updatedBy": 10436,
              "name": "traffic_accidents_details",
              "label": "Geef details:",
              "hidden": false,
              "children": [],
              "answerType": "TEXT_AREA",
              "mandatory": true,
              "horizontal": false,
              "description": ""
            },
            {
              "class": "com.biit.webforms.persistence.entity.Question",
              "comparationId": "794dd8fd-84e4-4abf-b753-01d4a7db8996",
              "creationTime": "Jun 2, 2015 3:36:09 PM",
              "updateTime": "May 16, 2016 9:52:56 AM",
              "createdBy": 10436,
              "updatedBy": 10436,
              "name": "heart_transplant",
              "label": "Heeft iemand in uw familie een harttransplantatie ondergaan?",
              "hidden": false,
              "children": [
                {
                  "class": "com.biit.webforms.persistence.entity.Answer",
                  "comparationId": "22a25ae9-1b94-4c40-aa53-496cf8dfe58a",
                  "creationTime": "Jun 2, 2015 3:39:46 PM",
                  "updateTime": "Jun 2, 2015 3:41:46 PM",
                  "createdBy": 10436,
                  "updatedBy": 10436,
                  "name": "yes",
                  "label": "Ja",
                  "hidden": false,
                  "children": [],
                  "description": ""
                },
                {
                  "class": "com.biit.webforms.persistence.entity.Answer",
                  "comparationId": "c570a775-1db0-4e85-866f-5a8c7b9a484f",
                  "creationTime": "Jun 2, 2015 3:39:46 PM",
                  "updateTime": "Jun 2, 2015 3:41:52 PM",
                  "createdBy": 10436,
                  "updatedBy": 10436,
                  "name": "no",
                  "label": "Nee",
                  "hidden": false,
                  "children": [],
                  "description": ""
                }
              ],
              "answerType": "SINGLE_SELECTION_RADIO",
              "mandatory": true,
              "horizontal": true,
              "description": ""
            },
            {
              "class": "com.biit.webforms.persistence.entity.Question",
              "comparationId": "9d1c7df7-5856-4e95-8dae-df03199c6f1f",
              "creationTime": "Jul 10, 2015 1:38:06 PM",
              "updateTime": "Jul 10, 2015 1:46:05 PM",
              "createdBy": 10436,
              "updatedBy": 10436,
              "name": "heart_transplant_details",
              "label": "Geef details:",
              "hidden": false,
              "children": [],
              "answerType": "TEXT_AREA",
              "mandatory": true,
              "horizontal": false,
              "description": ""
            },
            {
              "class": "com.biit.webforms.persistence.entity.Question",
              "comparationId": "6d538770-caac-497c-9be7-a9446ae70b3c",
              "creationTime": "Jun 2, 2015 3:36:10 PM",
              "updateTime": "May 16, 2016 9:52:56 AM",
              "createdBy": 10436,
              "updatedBy": 10436,
              "name": "heart_surgery",
              "label": "Heeft iemand in uw familie op jonge leeftijd een hartoperatie ondergaan?",
              "hidden": false,
              "children": [
                {
                  "class": "com.biit.webforms.persistence.entity.Answer",
                  "comparationId": "eec9acff-759d-446d-94fa-c2446dce9d63",
                  "creationTime": "Jun 2, 2015 3:39:49 PM",
                  "updateTime": "Jun 2, 2015 3:41:59 PM",
                  "createdBy": 10436,
                  "updatedBy": 10436,
                  "name": "yes",
                  "label": "Ja",
                  "hidden": false,
                  "children": [],
                  "description": ""
                },
                {
                  "class": "com.biit.webforms.persistence.entity.Answer",
                  "comparationId": "35a33e59-0705-4274-b6b9-33d34bf7d3ae",
                  "creationTime": "Jun 2, 2015 3:39:49 PM",
                  "updateTime": "Jun 2, 2015 3:42:06 PM",
                  "createdBy": 10436,
                  "updatedBy": 10436,
                  "name": "no",
                  "label": "Nee",
                  "hidden": false,
                  "children": [],
                  "description": ""
                }
              ],
              "answerType": "SINGLE_SELECTION_RADIO",
              "mandatory": true,
              "horizontal": true,
              "description": ""
            },
            {
              "class": "com.biit.webforms.persistence.entity.Question",
              "comparationId": "7abd3b77-ee17-4a78-928b-f1fba722f229",
              "creationTime": "Jul 10, 2015 1:38:07 PM",
              "updateTime": "Jul 10, 2015 1:46:10 PM",
              "createdBy": 10436,
              "updatedBy": 10436,
              "name": "heart_surgery_details",
              "label": "Geef details:",
              "hidden": false,
              "children": [],
              "answerType": "TEXT_AREA",
              "mandatory": true,
              "horizontal": false,
              "description": ""
            },
            {
              "class": "com.biit.webforms.persistence.entity.Question",
              "comparationId": "a4cd332c-de68-48f3-83f7-39eccd68d538",
              "creationTime": "Jun 2, 2015 3:36:11 PM",
              "updateTime": "May 16, 2016 9:52:56 AM",
              "createdBy": 10436,
              "updatedBy": 10436,
              "name": "pacemaker",
              "label": "Heeft iemand in uw familie een pacemaker of defibrillator (ICD)?",
              "hidden": false,
              "children": [
                {
                  "class": "com.biit.webforms.persistence.entity.Answer",
                  "comparationId": "2d9fc216-cfc1-4251-93c4-4aa8150dd1d1",
                  "creationTime": "Jun 2, 2015 3:39:51 PM",
                  "updateTime": "Jun 2, 2015 3:42:13 PM",
                  "createdBy": 10436,
                  "updatedBy": 10436,
                  "name": "yes",
                  "label": "Ja",
                  "hidden": false,
                  "children": [],
                  "description": ""
                },
                {
                  "class": "com.biit.webforms.persistence.entity.Answer",
                  "comparationId": "0c0d8203-fc23-47ca-9890-94732134857d",
                  "creationTime": "Jun 2, 2015 3:39:52 PM",
                  "updateTime": "Jun 2, 2015 3:42:19 PM",
                  "createdBy": 10436,
                  "updatedBy": 10436,
                  "name": "no",
                  "label": "Nee",
                  "hidden": false,
                  "children": [],
                  "description": ""
                }
              ],
              "answerType": "SINGLE_SELECTION_RADIO",
              "mandatory": true,
              "horizontal": true,
              "description": ""
            },
            {
              "class": "com.biit.webforms.persistence.entity.Question",
              "comparationId": "380ce357-45bc-4efe-b896-b963992f52c9",
              "creationTime": "Jul 10, 2015 1:38:09 PM",
              "updateTime": "Jul 10, 2015 1:46:14 PM",
              "createdBy": 10436,
              "updatedBy": 10436,
              "name": "pacemaker_details",
              "label": "Geef details:",
              "hidden": false,
              "children": [],
              "answerType": "TEXT_AREA",
              "mandatory": true,
              "horizontal": false,
              "description": ""
            },
            {
              "class": "com.biit.webforms.persistence.entity.Question",
              "comparationId": "1316a6f6-5f8e-4d89-a847-4f28ca5eb2b9",
              "creationTime": "Jun 2, 2015 3:36:11 PM",
              "updateTime": "May 16, 2016 9:52:56 AM",
              "createdBy": 10436,
              "updatedBy": 10436,
              "name": "arrhythmia",
              "label": "Wordt iemand in uw familie behandeld voor hartritmestoornissen?",
              "hidden": false,
              "children": [
                {
                  "class": "com.biit.webforms.persistence.entity.Answer",
                  "comparationId": "b84619a9-972e-421e-af4f-6d6e4516688c",
                  "creationTime": "Jun 2, 2015 3:39:56 PM",
                  "updateTime": "Jul 10, 2015 4:19:14 PM",
                  "createdBy": 10436,
                  "updatedBy": 10436,
                  "name": "yes",
                  "label": "Ja",
                  "hidden": false,
                  "children": [],
                  "description": ""
                },
                {
                  "class": "com.biit.webforms.persistence.entity.Answer",
                  "comparationId": "3fb04ebc-573a-46c5-acb8-0fa551f9a5c0",
                  "creationTime": "Jun 2, 2015 3:39:56 PM",
                  "updateTime": "Jul 10, 2015 4:19:21 PM",
                  "createdBy": 10436,
                  "updatedBy": 10436,
                  "name": "no",
                  "label": "Nee",
                  "hidden": false,
                  "children": [],
                  "description": ""
                }
              ],
              "answerType": "SINGLE_SELECTION_RADIO",
              "mandatory": true,
              "horizontal": true,
              "description": ""
            },
            {
              "class": "com.biit.webforms.persistence.entity.Question",
              "comparationId": "4b97fd9a-1b6f-408e-bb35-a023330a7cce",
              "creationTime": "Jul 10, 2015 1:38:10 PM",
              "updateTime": "Jul 10, 2015 1:46:18 PM",
              "createdBy": 10436,
              "updatedBy": 10436,
              "name": "arrhythmia_details",
              "label": "Geef details:",
              "hidden": false,
              "children": [],
              "answerType": "TEXT_AREA",
              "mandatory": true,
              "horizontal": false,
              "description": ""
            },
            {
              "class": "com.biit.webforms.persistence.entity.Question",
              "comparationId": "d45779e5-9289-411c-bfa4-da6677b9f3fc",
              "creationTime": "Jun 2, 2015 3:36:12 PM",
              "updateTime": "May 16, 2016 9:52:56 AM",
              "createdBy": 10436,
              "updatedBy": 10436,
              "name": "infant_death",
              "label": "Is er in uw familie iemand overleden aan wiegendood?",
              "hidden": false,
              "children": [
                {
                  "class": "com.biit.webforms.persistence.entity.Answer",
                  "comparationId": "c79bcdf0-56dd-4b3d-b750-fa5e27b0fb42",
                  "creationTime": "Jun 2, 2015 3:40:00 PM",
                  "updateTime": "Jun 2, 2015 3:42:39 PM",
                  "createdBy": 10436,
                  "updatedBy": 10436,
                  "name": "yes",
                  "label": "Ja",
                  "hidden": false,
                  "children": [],
                  "description": ""
                },
                {
                  "class": "com.biit.webforms.persistence.entity.Answer",
                  "comparationId": "474663a0-54e3-454e-891d-8636d49d8e74",
                  "creationTime": "Jun 2, 2015 3:40:00 PM",
                  "updateTime": "Jun 2, 2015 3:42:44 PM",
                  "createdBy": 10436,
                  "updatedBy": 10436,
                  "name": "no",
                  "label": "Nee",
                  "hidden": false,
                  "children": [],
                  "description": ""
                }
              ],
              "answerType": "SINGLE_SELECTION_RADIO",
              "mandatory": true,
              "horizontal": true,
              "description": ""
            },
            {
              "class": "com.biit.webforms.persistence.entity.Question",
              "comparationId": "1d742a3e-97e9-4044-8534-f0173bc7bc1b",
              "creationTime": "Jul 10, 2015 1:38:12 PM",
              "updateTime": "Jul 10, 2015 1:46:23 PM",
              "createdBy": 10436,
              "updatedBy": 10436,
              "name": "infant_death_details",
              "label": "Geef details:",
              "hidden": false,
              "children": [],
              "answerType": "TEXT_AREA",
              "mandatory": true,
              "horizontal": false,
              "description": ""
            },
            {
              "class": "com.biit.webforms.persistence.entity.Question",
              "comparationId": "8eb66fea-5d0f-4892-9ce9-6cdcdb24eccb",
              "creationTime": "Jun 2, 2015 3:36:13 PM",
              "updateTime": "May 16, 2016 9:52:56 AM",
              "createdBy": 10436,
              "updatedBy": 10436,
              "name": "diabetes",
              "label": "Komt bij u in de familie suikerziekte (diabetes mellitus) op uitgebreide schaal voor?",
              "hidden": false,
              "children": [
                {
                  "class": "com.biit.webforms.persistence.entity.Answer",
                  "comparationId": "bac12156-57b7-4a85-bb8e-83e4ef7ec7ca",
                  "creationTime": "Jun 2, 2015 3:40:03 PM",
                  "updateTime": "Jun 2, 2015 3:42:51 PM",
                  "createdBy": 10436,
                  "updatedBy": 10436,
                  "name": "yes",
                  "label": "Ja",
                  "hidden": false,
                  "children": [],
                  "description": ""
                },
                {
                  "class": "com.biit.webforms.persistence.entity.Answer",
                  "comparationId": "c374b6e3-1ab5-487a-b178-bf2894a33af9",
                  "creationTime": "Jun 2, 2015 3:40:04 PM",
                  "updateTime": "Jun 2, 2015 3:42:57 PM",
                  "createdBy": 10436,
                  "updatedBy": 10436,
                  "name": "no",
                  "label": "Nee",
                  "hidden": false,
                  "children": [],
                  "description": ""
                }
              ],
              "answerType": "SINGLE_SELECTION_RADIO",
              "mandatory": true,
              "horizontal": true,
              "description": ""
            },
            {
              "class": "com.biit.webforms.persistence.entity.Question",
              "comparationId": "a6ffb336-daf8-419b-b248-215494c1f32e",
              "creationTime": "Jul 10, 2015 1:38:13 PM",
              "updateTime": "Jul 10, 2015 1:46:28 PM",
              "createdBy": 10436,
              "updatedBy": 10436,
              "name": "diabetes_details",
              "label": "Geef details:",
              "hidden": false,
              "children": [],
              "answerType": "TEXT_AREA",
              "mandatory": true,
              "horizontal": false,
              "description": ""
            },
            {
              "class": "com.biit.webforms.persistence.entity.Question",
              "comparationId": "7dade026-b106-451a-8f5f-fd0d60f98a87",
              "creationTime": "Jun 2, 2015 3:36:14 PM",
              "updateTime": "May 16, 2016 9:52:56 AM",
              "createdBy": 10436,
              "updatedBy": 10436,
              "name": "marfan_syndrome",
              "label": "Is er iemand in uw familie met het syndroom van Marfan?",
              "hidden": false,
              "children": [
                {
                  "class": "com.biit.webforms.persistence.entity.Answer",
                  "comparationId": "5fe90c30-1b18-41ec-aa55-2a9cc27d64be",
                  "creationTime": "Jun 2, 2015 3:40:08 PM",
                  "updateTime": "Jun 2, 2015 3:43:16 PM",
                  "createdBy": 10436,
                  "updatedBy": 10436,
                  "name": "yes",
                  "label": "Ja",
                  "hidden": false,
                  "children": [],
                  "description": ""
                },
                {
                  "class": "com.biit.webforms.persistence.entity.Answer",
                  "comparationId": "8262d353-ac3c-4e52-a728-f1e0c1546c35",
                  "creationTime": "Jun 2, 2015 3:40:09 PM",
                  "updateTime": "Jun 2, 2015 3:43:11 PM",
                  "createdBy": 10436,
                  "updatedBy": 10436,
                  "name": "no",
                  "label": "Nee",
                  "hidden": false,
                  "children": [],
                  "description": ""
                }
              ],
              "answerType": "SINGLE_SELECTION_RADIO",
              "mandatory": true,
              "horizontal": true,
              "description": ""
            },
            {
              "class": "com.biit.webforms.persistence.entity.Question",
              "comparationId": "030d7615-ae10-41e3-8921-801545edc72d",
              "creationTime": "Jul 10, 2015 1:41:18 PM",
              "updateTime": "Jul 10, 2015 1:46:40 PM",
              "createdBy": 10436,
              "updatedBy": 10436,
              "name": "marfan_syndrome_details",
              "label": "Geef details:",
              "hidden": false,
              "children": [],
              "answerType": "TEXT_AREA",
              "mandatory": true,
              "horizontal": false,
              "description": ""
            },
            {
              "class": "com.biit.webforms.persistence.entity.Text",
              "comparationId": "2fd9dd62-4c01-4ad4-9654-f398c38ebd20",
              "creationTime": "Oct 20, 2015 1:53:15 PM",
              "updateTime": "Oct 20, 2015 1:54:30 PM",
              "createdBy": 10436,
              "updatedBy": 10436,
              "name": "EndFamilyStory",
              "label": "Endie Familie anamnese",
              "hidden": false,
              "children": [],
              "description": "Endie Familie anamnese"
            }
          ]
        },
        {
          "class": "com.biit.webforms.persistence.entity.Category",
          "comparationId": "b484135e-76a5-4ef6-aeae-d00ece512e45",
          "creationTime": "Mar 30, 2015 6:16:07 PM",
          "updateTime": "Jul 3, 2017 9:37:58 AM",
          "createdBy": 10436,
          "updatedBy": 10436,
          "name": "Appointment",
          "label": "Afspraak",
          "hidden": false,
          "children": [
            {
              "class": "com.biit.webforms.persistence.entity.Text",
              "comparationId": "61ecf6d3-8700-4d5b-b84e-8aa23e688e32",
              "creationTime": "Jul 10, 2015 1:55:10 PM",
              "updateTime": "Mar 22, 2016 12:07:10 PM",
              "createdBy": 10436,
              "updatedBy": 10436,
              "name": "info_appointment",
              "label": "Bedankt voor het invullen van ...",
              "hidden": false,
              "children": [],
              "description": "Bedankt voor het invullen van het formulier."
            },
            {
              "class": "com.biit.webforms.persistence.entity.Text",
              "comparationId": "6a440485-64d2-4491-9c54-6c08a65c715b",
              "creationTime": "Jul 9, 2015 3:53:05 PM",
              "updateTime": "Mar 22, 2016 12:07:10 PM",
              "createdBy": 10436,
              "updatedBy": 10436,
              "name": "info_examination_basic",
              "label": "Gebaseerd op uw antwoorden adv...",
              "hidden": false,
              "children": [],
              "description": "Gebaseerd op uw antwoorden adviseren wij een \u0027Basis Sportmedisch Onderzoek\u0027. "
            },
            {
              "class": "com.biit.webforms.persistence.entity.Text",
              "comparationId": "16e8b1fe-3fa3-4cb4-a7d5-f23f38c5f92c",
              "creationTime": "Jul 9, 2015 3:57:15 PM",
              "updateTime": "Mar 22, 2016 12:07:11 PM",
              "createdBy": 10436,
              "updatedBy": 10436,
              "name": "info_examination_plus",
              "label": "Gebaseerd op uw antwoorden adv...",
              "hidden": false,
              "children": [],
              "description": "Gebaseerd op uw antwoorden adviseren wij een \u0027Basisplus Sportmedisch Onderzoek\u0027. "
            },
            {
              "class": "com.biit.webforms.persistence.entity.Text",
              "comparationId": "7e375e39-0c43-4b69-85a0-a9926a782892",
              "creationTime": "Jul 9, 2015 3:57:19 PM",
              "updateTime": "Mar 22, 2016 12:07:12 PM",
              "createdBy": 10436,
              "updatedBy": 10436,
              "name": "info_examination_extended",
              "label": "Gebaseerd op uw antwoorden adv...",
              "hidden": false,
              "children": [],
              "description": "Gebaseerd op uw antwoorden adviseren wij een \u0027Uitgebreid Sportmedisch Onderzoek\u0027. "
            },
            {
              "class": "com.biit.webforms.persistence.entity.Text",
              "comparationId": "6044776f-2edf-417d-ab86-4eec14445378",
              "creationTime": "Mar 22, 2016 12:02:38 PM",
              "updateTime": "Mar 22, 2016 12:07:13 PM",
              "createdBy": 10436,
              "updatedBy": 10436,
              "name": "info_examination_cios",
              "label": "Gebaseerd op uw antwoorden adv...",
              "hidden": false,
              "children": [],
              "description": "Gebaseerd op uw antwoorden adviseren wij een \u0027CIOS Sportmedisch Onderzoek\u0027. "
            },
            {
              "class": "com.biit.webforms.persistence.entity.Text",
              "comparationId": "8a3d643a-0c8e-431a-9d71-990986b8797c",
              "creationTime": "Mar 22, 2016 12:06:34 PM",
              "updateTime": "Mar 22, 2016 12:07:14 PM",
              "createdBy": 10436,
              "updatedBy": 10436,
              "name": "info_examination_veva",
              "label": "Gebaseerd op uw antwoorden adv...",
              "hidden": false,
              "children": [],
              "description": "Gebaseerd op uw antwoorden adviseren wij een \u0027VeVa Sportmedisch Onderzoek\u0027. "
            },
            {
              "class": "com.biit.webforms.persistence.entity.Text",
              "comparationId": "80aedcc2-6610-4eea-a4b8-77e85a42a805",
              "creationTime": "Mar 30, 2015 6:16:23 PM",
              "updateTime": "Mar 22, 2016 12:07:27 PM",
              "createdBy": 10436,
              "updatedBy": 10436,
              "name": "info_end",
              "label": "Wij zullen zo spoedig mogelijk...",
              "hidden": false,
              "children": [],
              "description": "Wij zullen zo spoedig mogelijk contact met u opnemen voor het maken van een afspraak.\n\nU kunt nu op \u0027Verzenden\u0027 drukken om het formulier naar ons toe te verzenden."
            }
          ]
        }
      ],
      "version": 4,
      "organizationId": 18903,
      "description": "",
      "flows": [
        {
          "class": "com.biit.webforms.persistence.entity.Flow",
          "comparationId": "4c4c65d1-d9ad-4f02-9bea-febb3d579de9",
          "creationTime": "Jul 10, 2015 3:20:41 PM",
          "updateTime": "Jul 10, 2015 3:20:41 PM",
          "createdBy": 10436,
          "updatedBy": 10436,
          "origin_id": [
            "HealthLifestyle",
            "medication"
          ],
          "flowType": "NORMAL",
          "destiny_id": [
            "HealthLifestyle",
            "medication_details"
          ],
          "others": false,
          "condition": [
            {
              "class": "com.biit.webforms.persistence.entity.condition.TokenComparationAnswer",
              "comparationId": "d1b32880-7f37-4f80-881c-6781940700d3",
              "creationTime": "Jul 10, 2015 3:20:41 PM",
              "updateTime": "Jul 10, 2015 3:22:53 PM",
              "type": "EQ",
              "question_id": [
                "HealthLifestyle",
                "medication"
              ],
              "answer_id": [
                "HealthLifestyle",
                "medication",
                "yes"
              ]
            }
          ]
        },
        {
          "class": "com.biit.webforms.persistence.entity.Flow",
          "comparationId": "fa4a246d-f208-450e-9f64-7196cc8987c1",
          "creationTime": "Jul 10, 2015 4:12:44 PM",
          "updateTime": "Jul 10, 2015 4:12:44 PM",
          "createdBy": 10436,
          "updatedBy": 10436,
          "origin_id": [
            "Lausanne",
            "high_cholesterol"
          ],
          "flowType": "NORMAL",
          "destiny_id": [
            "Lausanne",
            "high_cholesterol_details"
          ],
          "others": false,
          "condition": [
            {
              "class": "com.biit.webforms.persistence.entity.condition.TokenComparationAnswer",
              "comparationId": "770702d3-ffd2-42a5-8825-254abdb44590",
              "creationTime": "Jul 10, 2015 4:12:43 PM",
              "updateTime": "Jul 10, 2015 4:13:01 PM",
              "type": "EQ",
              "question_id": [
                "Lausanne",
                "high_cholesterol"
              ],
              "answer_id": [
                "Lausanne",
                "high_cholesterol",
                "yes"
              ]
            }
          ]
        },
        {
          "class": "com.biit.webforms.persistence.entity.Flow",
          "comparationId": "036d65e3-28a3-4917-99ee-b527f4b3dde3",
          "creationTime": "Jul 10, 2015 4:06:05 PM",
          "updateTime": "Jul 10, 2015 4:06:05 PM",
          "createdBy": 10436,
          "updatedBy": 10436,
          "origin_id": [
            "Lausanne",
            "dizziness"
          ],
          "flowType": "NORMAL",
          "destiny_id": [
            "Lausanne",
            "epilepsy"
          ],
          "others": false,
          "condition": [
            {
              "class": "com.biit.webforms.persistence.entity.condition.TokenComparationAnswer",
              "comparationId": "f125e9ab-b672-4c14-a989-368cf0fd663a",
              "creationTime": "Jul 10, 2015 4:06:04 PM",
              "updateTime": "Jul 10, 2015 4:06:50 PM",
              "type": "EQ",
              "question_id": [
                "Lausanne",
                "dizziness"
              ],
              "answer_id": [
                "Lausanne",
                "dizziness",
                "no"
              ]
            }
          ]
        },
        {
          "class": "com.biit.webforms.persistence.entity.Flow",
          "comparationId": "8f6303eb-9562-42d2-a627-6b50a8fe8eda",
          "creationTime": "Jul 10, 2015 4:08:38 PM",
          "updateTime": "Jul 10, 2015 4:08:38 PM",
          "createdBy": 10436,
          "updatedBy": 10436,
          "origin_id": [
            "Lausanne",
            "arrhythmia"
          ],
          "flowType": "NORMAL",
          "destiny_id": [
            "Lausanne",
            "arrhythmia_details"
          ],
          "others": false,
          "condition": [
            {
              "class": "com.biit.webforms.persistence.entity.condition.TokenComparationAnswer",
              "comparationId": "bf17cd96-343e-4d35-abf3-43afc61b91a8",
              "creationTime": "Jul 10, 2015 4:08:37 PM",
              "updateTime": "Jul 10, 2015 4:13:01 PM",
              "type": "EQ",
              "question_id": [
                "Lausanne",
                "arrhythmia"
              ],
              "answer_id": [
                "Lausanne",
                "arrhythmia",
                "yes"
              ]
            }
          ]
        },
        {
          "class": "com.biit.webforms.persistence.entity.Flow",
          "comparationId": "db387322-d1c9-4c4d-8c5d-064c21739300",
          "creationTime": "Jul 10, 2015 3:18:59 PM",
          "updateTime": "Jul 10, 2015 3:18:59 PM",
          "createdBy": 10436,
          "updatedBy": 10436,
          "origin_id": [
            "HealthLifestyle",
            "hearing_problems"
          ],
          "flowType": "NORMAL",
          "destiny_id": [
            "HealthLifestyle",
            "hearing_problems_details"
          ],
          "others": false,
          "condition": [
            {
              "class": "com.biit.webforms.persistence.entity.condition.TokenComparationAnswer",
              "comparationId": "d99f833c-e870-4bfa-a936-678da8bb3ef0",
              "creationTime": "Jul 10, 2015 3:18:58 PM",
              "updateTime": "Jul 10, 2015 3:22:53 PM",
              "type": "EQ",
              "question_id": [
                "HealthLifestyle",
                "hearing_problems"
              ],
              "answer_id": [
                "HealthLifestyle",
                "hearing_problems",
                "yes"
              ]
            }
          ]
        },
        {
          "class": "com.biit.webforms.persistence.entity.Flow",
          "comparationId": "3fc991a0-447b-4514-a070-eaff42007d53",
          "creationTime": "Oct 20, 2015 6:02:20 PM",
          "updateTime": "Mar 24, 2016 11:54:39 AM",
          "createdBy": 10436,
          "updatedBy": 10436,
          "origin_id": [
            "Reason",
            "reason"
          ],
          "flowType": "NORMAL",
          "destiny_id": [
            "Appointment",
            "info_appointment"
          ],
          "others": false,
          "condition": [
            {
              "class": "com.biit.webforms.persistence.entity.condition.TokenIn",
              "comparationId": "8c05e5dc-abb2-4f2a-bca9-4fe2c5e15814",
              "creationTime": "Oct 20, 2015 6:02:19 PM",
              "updateTime": "Jan 3, 2018 2:54:00 PM",
              "type": "IN",
              "question_id": [
                "Reason",
                "reason"
              ],
              "values": [
                {
                  "class": "com.biit.webforms.persistence.entity.condition.TokenInValue",
                  "comparationId": "bde38591-885a-4bda-830f-41eed99f0345",
                  "creationTime": "Mar 24, 2016 11:54:39 AM",
                  "updateTime": "Jan 3, 2018 2:54:00 PM",
                  "answer_id": [
                    "Reason",
                    "reason",
                    "cios"
                  ]
                },
                {
                  "class": "com.biit.webforms.persistence.entity.condition.TokenInValue",
                  "comparationId": "3e4d0b50-1cac-4526-b45a-716a0ba91bef",
                  "creationTime": "Mar 24, 2016 11:54:39 AM",
                  "updateTime": "Jan 3, 2018 2:54:00 PM",
                  "answer_id": [
                    "Reason",
                    "reason",
                    "veva"
                  ]
                },
                {
                  "class": "com.biit.webforms.persistence.entity.condition.TokenInValue",
                  "comparationId": "362d4e4b-8e5d-4d3b-b953-f62f2bf1034b",
                  "creationTime": "Mar 24, 2016 11:54:39 AM",
                  "updateTime": "Jan 3, 2018 2:54:00 PM",
                  "answer_id": [
                    "Reason",
                    "reason",
                    "sport"
                  ]
                },
                {
                  "class": "com.biit.webforms.persistence.entity.condition.TokenInValue",
                  "comparationId": "ae3c061d-5d7f-4a1a-bd38-2197937fdad2",
                  "creationTime": "Mar 24, 2016 11:54:39 AM",
                  "updateTime": "Jan 3, 2018 2:54:00 PM",
                  "answer_id": [
                    "Reason",
                    "reason",
                    "others"
                  ]
                },
                {
                  "class": "com.biit.webforms.persistence.entity.condition.TokenInValue",
                  "comparationId": "8a2846d8-23cf-4ae3-971f-a89f2878a90e",
                  "creationTime": "Mar 24, 2016 11:54:39 AM",
                  "updateTime": "Jan 3, 2018 2:54:00 PM",
                  "answer_id": [
                    "Reason",
                    "reason",
                    "screening_examinations"
                  ]
                }
              ]
            }
          ]
        },
        {
          "class": "com.biit.webforms.persistence.entity.Flow",
          "comparationId": "778dd212-6667-4336-9871-ea80cf89bc6e",
          "creationTime": "Jul 10, 2015 1:52:40 PM",
          "updateTime": "Jul 10, 2015 1:52:40 PM",
          "createdBy": 10436,
          "updatedBy": 10436,
          "origin_id": [
            "IllnessInjury",
            "flu"
          ],
          "flowType": "NORMAL",
          "destiny_id": [
            "IllnessInjury",
            "injuries_in_the_past"
          ],
          "others": false,
          "condition": [
            {
              "class": "com.biit.webforms.persistence.entity.condition.TokenComparationAnswer",
              "comparationId": "b0e0695d-2962-48d3-8977-5c4289b1c597",
              "creationTime": "Jul 10, 2015 1:52:39 PM",
              "updateTime": "Jul 10, 2015 1:53:52 PM",
              "type": "EQ",
              "question_id": [
                "IllnessInjury",
                "flu"
              ],
              "answer_id": [
                "IllnessInjury",
                "flu",
                "no"
              ]
            }
          ]
        },
        {
          "class": "com.biit.webforms.persistence.entity.Flow",
          "comparationId": "6130e10f-3727-4389-9a02-8573635446aa",
          "creationTime": "Jul 10, 2015 1:52:55 PM",
          "updateTime": "Jul 10, 2015 1:52:55 PM",
          "createdBy": 10436,
          "updatedBy": 10436,
          "origin_id": [
            "IllnessInjury",
            "injuries_in_the_past"
          ],
          "flowType": "NORMAL",
          "destiny_id": [
            "IllnessInjury",
            "injuries_in_the_past_details"
          ],
          "others": false,
          "condition": [
            {
              "class": "com.biit.webforms.persistence.entity.condition.TokenComparationAnswer",
              "comparationId": "5293783b-52c5-409d-91ce-ae94236da24e",
              "creationTime": "Jul 10, 2015 1:52:54 PM",
              "updateTime": "Jul 10, 2015 1:53:52 PM",
              "type": "EQ",
              "question_id": [
                "IllnessInjury",
                "injuries_in_the_past"
              ],
              "answer_id": [
                "IllnessInjury",
                "injuries_in_the_past",
                "yes"
              ]
            }
          ]
        },
        {
          "class": "com.biit.webforms.persistence.entity.Flow",
          "comparationId": "625d7810-9fc2-4f03-bb4a-0b0c97b332f8",
          "creationTime": "Jun 2, 2015 4:42:59 PM",
          "updateTime": "Jun 2, 2015 4:42:59 PM",
          "createdBy": 10436,
          "updatedBy": 10436,
          "origin_id": [
            "Lausanne",
            "chestpain"
          ],
          "flowType": "NORMAL",
          "destiny_id": [
            "Lausanne",
            "chestpain_extra"
          ],
          "others": false,
          "condition": [
            {
              "class": "com.biit.webforms.persistence.entity.condition.TokenComparationAnswer",
              "comparationId": "3b0feaa8-c874-4629-a44c-477333c16017",
              "creationTime": "Jun 2, 2015 4:42:58 PM",
              "updateTime": "Jun 2, 2015 4:43:02 PM",
              "type": "EQ",
              "question_id": [
                "Lausanne",
                "chestpain"
              ],
              "answer_id": [
                "Lausanne",
                "chestpain",
                "yes"
              ]
            }
          ]
        },
        {
          "class": "com.biit.webforms.persistence.entity.Flow",
          "comparationId": "3e578971-9385-41f0-b9f3-4447455583bb",
          "creationTime": "Jul 10, 2015 4:07:28 PM",
          "updateTime": "Jul 10, 2015 4:07:28 PM",
          "createdBy": 10436,
          "updatedBy": 10436,
          "origin_id": [
            "Lausanne",
            "exhausted"
          ],
          "flowType": "NORMAL",
          "destiny_id": [
            "Lausanne",
            "palpitations"
          ],
          "others": false,
          "condition": [
            {
              "class": "com.biit.webforms.persistence.entity.condition.TokenComparationAnswer",
              "comparationId": "d8562351-8c45-4eea-86df-399f1034fa28",
              "creationTime": "Jul 10, 2015 4:07:27 PM",
              "updateTime": "Jul 10, 2015 4:13:01 PM",
              "type": "EQ",
              "question_id": [
                "Lausanne",
                "exhausted"
              ],
              "answer_id": [
                "Lausanne",
                "exhausted",
                "no"
              ]
            }
          ]
        },
        {
          "class": "com.biit.webforms.persistence.entity.Flow",
          "comparationId": "61f006c6-d71e-4640-8558-b1ebf905ed03",
          "creationTime": "Jul 9, 2015 5:46:59 PM",
          "updateTime": "Oct 7, 2015 11:31:33 AM",
          "createdBy": 10436,
          "updatedBy": 10436,
          "origin_id": [
            "Appointment",
            "info_examination_plus"
          ],
          "flowType": "NORMAL",
          "destiny_id": [
            "Appointment",
            "info_end"
          ],
          "others": false,
          "condition": []
        },
        {
          "class": "com.biit.webforms.persistence.entity.Flow",
          "comparationId": "f2eb88c2-3ca6-41ee-8168-c2da22c0bc59",
          "creationTime": "Jul 10, 2015 1:53:15 PM",
          "updateTime": "Jul 10, 2015 1:53:15 PM",
          "createdBy": 10436,
          "updatedBy": 10436,
          "origin_id": [
            "IllnessInjury",
            "injuries_in_the_past"
          ],
          "flowType": "NORMAL",
          "destiny_id": [
            "IllnessInjury",
            "injured"
          ],
          "others": false,
          "condition": [
            {
              "class": "com.biit.webforms.persistence.entity.condition.TokenComparationAnswer",
              "comparationId": "9577f718-fca3-4162-b409-0def325af67f",
              "creationTime": "Jul 10, 2015 1:53:14 PM",
              "updateTime": "Jul 10, 2015 1:53:52 PM",
              "type": "EQ",
              "question_id": [
                "IllnessInjury",
                "injuries_in_the_past"
              ],
              "answer_id": [
                "IllnessInjury",
                "injuries_in_the_past",
                "no"
              ]
            }
          ]
        },
        {
          "class": "com.biit.webforms.persistence.entity.Flow",
          "comparationId": "f6909567-f67f-43f1-a8b9-8a7cb6cac63e",
          "creationTime": "Jul 10, 2015 4:19:44 PM",
          "updateTime": "Jul 10, 2015 4:19:44 PM",
          "createdBy": 10436,
          "updatedBy": 10436,
          "origin_id": [
            "FamilyHistoryAnamnesis",
            "arrhythmia"
          ],
          "flowType": "NORMAL",
          "destiny_id": [
            "FamilyHistoryAnamnesis",
            "infant_death"
          ],
          "others": false,
          "condition": [
            {
              "class": "com.biit.webforms.persistence.entity.condition.TokenComparationAnswer",
              "comparationId": "2c394d3f-38f3-450b-b621-964dd324c829",
              "creationTime": "Jul 10, 2015 4:19:43 PM",
              "updateTime": "Jul 10, 2015 4:21:15 PM",
              "type": "EQ",
              "question_id": [
                "FamilyHistoryAnamnesis",
                "arrhythmia"
              ],
              "answer_id": [
                "FamilyHistoryAnamnesis",
                "arrhythmia",
                "no"
              ]
            }
          ]
        },
        {
          "class": "com.biit.webforms.persistence.entity.Flow",
          "comparationId": "7efdb931-0c35-49b6-b427-3e39a264478d",
          "creationTime": "Jul 10, 2015 3:16:14 PM",
          "updateTime": "Jul 10, 2015 3:16:14 PM",
          "createdBy": 10436,
          "updatedBy": 10436,
          "origin_id": [
            "HealthLifestyle",
            "often_tired"
          ],
          "flowType": "NORMAL",
          "destiny_id": [
            "HealthLifestyle",
            "often_tired_details"
          ],
          "others": false,
          "condition": [
            {
              "class": "com.biit.webforms.persistence.entity.condition.TokenComparationAnswer",
              "comparationId": "6d42d7a6-e8f6-4e7c-b24f-b1294ae274aa",
              "creationTime": "Jul 10, 2015 3:16:13 PM",
              "updateTime": "Jul 10, 2015 3:22:53 PM",
              "type": "EQ",
              "question_id": [
                "HealthLifestyle",
                "often_tired"
              ],
              "answer_id": [
                "HealthLifestyle",
                "often_tired",
                "yes"
              ]
            }
          ]
        },
        {
          "class": "com.biit.webforms.persistence.entity.Flow",
          "comparationId": "aea70b98-9627-4cdd-bc79-8f28c94d773a",
          "creationTime": "Jul 10, 2015 4:18:06 PM",
          "updateTime": "Jul 10, 2015 4:18:06 PM",
          "createdBy": 10436,
          "updatedBy": 10436,
          "origin_id": [
            "FamilyHistoryAnamnesis",
            "pacemaker"
          ],
          "flowType": "NORMAL",
          "destiny_id": [
            "FamilyHistoryAnamnesis",
            "pacemaker_details"
          ],
          "others": false,
          "condition": [
            {
              "class": "com.biit.webforms.persistence.entity.condition.TokenComparationAnswer",
              "comparationId": "c2472db6-4dd3-4431-90bd-9a3a40d8a74a",
              "creationTime": "Jul 10, 2015 4:18:05 PM",
              "updateTime": "Jul 10, 2015 4:19:26 PM",
              "type": "EQ",
              "question_id": [
                "FamilyHistoryAnamnesis",
                "pacemaker"
              ],
              "answer_id": [
                "FamilyHistoryAnamnesis",
                "pacemaker",
                "yes"
              ]
            }
          ]
        },
        {
          "class": "com.biit.webforms.persistence.entity.Flow",
          "comparationId": "679e2b64-569b-4396-ac7d-3df3c437b2cd",
          "creationTime": "Jul 10, 2015 3:15:57 PM",
          "updateTime": "Jul 10, 2015 3:15:57 PM",
          "createdBy": 10436,
          "updatedBy": 10436,
          "origin_id": [
            "HealthLifestyle",
            "health_issues"
          ],
          "flowType": "NORMAL",
          "destiny_id": [
            "HealthLifestyle",
            "often_tired"
          ],
          "others": false,
          "condition": [
            {
              "class": "com.biit.webforms.persistence.entity.condition.TokenComparationAnswer",
              "comparationId": "844189d1-dee0-480d-b821-5341ef54e151",
              "creationTime": "Jul 10, 2015 3:15:56 PM",
              "updateTime": "Jul 10, 2015 3:22:53 PM",
              "type": "EQ",
              "question_id": [
                "HealthLifestyle",
                "health_issues"
              ],
              "answer_id": [
                "HealthLifestyle",
                "health_issues",
                "no"
              ]
            }
          ]
        },
        {
          "class": "com.biit.webforms.persistence.entity.Flow",
          "comparationId": "4be1086b-df2b-49aa-8e44-b870f2a173cb",
          "creationTime": "Jul 10, 2015 4:16:53 PM",
          "updateTime": "Jul 10, 2015 4:16:53 PM",
          "createdBy": 10436,
          "updatedBy": 10436,
          "origin_id": [
            "FamilyHistoryAnamnesis",
            "traffic_accidents"
          ],
          "flowType": "NORMAL",
          "destiny_id": [
            "FamilyHistoryAnamnesis",
            "heart_transplant"
          ],
          "others": false,
          "condition": [
            {
              "class": "com.biit.webforms.persistence.entity.condition.TokenComparationAnswer",
              "comparationId": "81208908-f333-427a-8044-a589d889f451",
              "creationTime": "Jul 10, 2015 4:16:52 PM",
              "updateTime": "Jul 10, 2015 4:19:26 PM",
              "type": "EQ",
              "question_id": [
                "FamilyHistoryAnamnesis",
                "traffic_accidents"
              ],
              "answer_id": [
                "FamilyHistoryAnamnesis",
                "traffic_accidents",
                "no"
              ]
            }
          ]
        },
        {
          "class": "com.biit.webforms.persistence.entity.Flow",
          "comparationId": "61486cab-c679-4b00-9e0c-7a66ec95a472",
          "creationTime": "Jul 10, 2015 4:11:31 PM",
          "updateTime": "Jul 10, 2015 4:11:31 PM",
          "createdBy": 10436,
          "updatedBy": 10436,
          "origin_id": [
            "Lausanne",
            "virusinfection"
          ],
          "flowType": "NORMAL",
          "destiny_id": [
            "Lausanne",
            "rheumatism"
          ],
          "others": false,
          "condition": [
            {
              "class": "com.biit.webforms.persistence.entity.condition.TokenComparationAnswer",
              "comparationId": "b6945400-fd3b-4c8e-ae89-cf53c310d88d",
              "creationTime": "Jul 10, 2015 4:11:30 PM",
              "updateTime": "Jul 10, 2015 4:13:01 PM",
              "type": "EQ",
              "question_id": [
                "Lausanne",
                "virusinfection"
              ],
              "answer_id": [
                "Lausanne",
                "virusinfection",
                "no"
              ]
            }
          ]
        },
        {
          "class": "com.biit.webforms.persistence.entity.Flow",
          "comparationId": "b07aa415-ad91-4753-a252-5d86e3d85eb9",
          "creationTime": "Oct 20, 2015 6:01:26 PM",
          "updateTime": "Oct 20, 2015 6:16:54 PM",
          "createdBy": 10436,
          "updatedBy": 10436,
          "origin_id": [
            "Reason",
            "reason"
          ],
          "flowType": "NORMAL",
          "destiny_id": [
            "Lausanne",
            "unconscious"
          ],
          "others": false,
          "condition": [
            {
              "class": "com.biit.webforms.persistence.entity.condition.TokenIn",
              "comparationId": "ee399670-8ebf-4009-8956-2635ec789727",
              "creationTime": "Oct 20, 2015 6:01:24 PM",
              "updateTime": "Jan 3, 2018 2:54:00 PM",
              "type": "IN",
              "question_id": [
                "Reason",
                "reason"
              ],
              "values": [
                {
                  "class": "com.biit.webforms.persistence.entity.condition.TokenInValue",
                  "comparationId": "490feb73-51be-4aa9-967e-a7f46233ede3",
                  "creationTime": "Oct 20, 2015 6:01:24 PM",
                  "updateTime": "Jan 3, 2018 2:54:00 PM",
                  "answer_id": [
                    "Reason",
                    "reason",
                    "sport"
                  ]
                },
                {
                  "class": "com.biit.webforms.persistence.entity.condition.TokenInValue",
                  "comparationId": "b199698e-1a15-4678-bfaf-373b2c5e3104",
                  "creationTime": "Oct 20, 2015 6:01:24 PM",
                  "updateTime": "Jan 3, 2018 2:54:00 PM",
                  "answer_id": [
                    "Reason",
                    "reason",
                    "others"
                  ]
                },
                {
                  "class": "com.biit.webforms.persistence.entity.condition.TokenInValue",
                  "comparationId": "c82495cb-44a7-4935-971e-ccaed5445a19",
                  "creationTime": "Oct 20, 2015 6:01:24 PM",
                  "updateTime": "Jan 3, 2018 2:54:00 PM",
                  "answer_id": [
                    "Reason",
                    "reason",
                    "screening_examinations"
                  ]
                }
              ]
            }
          ]
        },
        {
          "class": "com.biit.webforms.persistence.entity.Flow",
          "comparationId": "72581101-6be6-421a-a7a8-32a3b64f5784",
          "creationTime": "Jul 10, 2015 1:51:47 PM",
          "updateTime": "Jul 10, 2015 1:51:47 PM",
          "createdBy": 10436,
          "updatedBy": 10436,
          "origin_id": [
            "IllnessInjury",
            "rejected"
          ],
          "flowType": "NORMAL",
          "destiny_id": [
            "IllnessInjury",
            "rejected_details"
          ],
          "others": false,
          "condition": [
            {
              "class": "com.biit.webforms.persistence.entity.condition.TokenComparationAnswer",
              "comparationId": "722eb129-2b99-48dd-a18c-7579c6b7551a",
              "creationTime": "Jul 10, 2015 1:51:46 PM",
              "updateTime": "Jul 10, 2015 1:53:52 PM",
              "type": "EQ",
              "question_id": [
                "IllnessInjury",
                "rejected"
              ],
              "answer_id": [
                "IllnessInjury",
                "rejected",
                "yes"
              ]
            }
          ]
        },
        {
          "class": "com.biit.webforms.persistence.entity.Flow",
          "comparationId": "6dbaf0e5-8ca7-4005-9002-944237536ef6",
          "creationTime": "Jul 10, 2015 4:06:36 PM",
          "updateTime": "Jul 10, 2015 4:06:36 PM",
          "createdBy": 10436,
          "updatedBy": 10436,
          "origin_id": [
            "Lausanne",
            "epilepsy"
          ],
          "flowType": "NORMAL",
          "destiny_id": [
            "Lausanne",
            "chestpain"
          ],
          "others": false,
          "condition": [
            {
              "class": "com.biit.webforms.persistence.entity.condition.TokenComparationAnswer",
              "comparationId": "d0e0334a-f7f3-49da-a794-12642c4c74e2",
              "creationTime": "Jul 10, 2015 4:06:35 PM",
              "updateTime": "Jul 10, 2015 4:06:50 PM",
              "type": "EQ",
              "question_id": [
                "Lausanne",
                "epilepsy"
              ],
              "answer_id": [
                "Lausanne",
                "epilepsy",
                "no"
              ]
            }
          ]
        },
        {
          "class": "com.biit.webforms.persistence.entity.Flow",
          "comparationId": "c2b48d2b-6191-4860-bae6-1ba0f473832c",
          "creationTime": "Jul 10, 2015 4:12:30 PM",
          "updateTime": "Jul 10, 2015 4:12:30 PM",
          "createdBy": 10436,
          "updatedBy": 10436,
          "origin_id": [
            "Lausanne",
            "high_blood_pressure"
          ],
          "flowType": "NORMAL",
          "destiny_id": [
            "Lausanne",
            "high_cholesterol"
          ],
          "others": false,
          "condition": [
            {
              "class": "com.biit.webforms.persistence.entity.condition.TokenComparationAnswer",
              "comparationId": "9c280b87-dc32-4107-85fa-a2c8efc31b0a",
              "creationTime": "Jul 10, 2015 4:12:29 PM",
              "updateTime": "Jul 10, 2015 4:13:01 PM",
              "type": "EQ",
              "question_id": [
                "Lausanne",
                "high_blood_pressure"
              ],
              "answer_id": [
                "Lausanne",
                "high_blood_pressure",
                "no"
              ]
            }
          ]
        },
        {
          "class": "com.biit.webforms.persistence.entity.Flow",
          "comparationId": "5f0a4b5d-94ff-4e71-b3c5-382bdfd339bd",
          "creationTime": "Jul 10, 2015 4:10:35 PM",
          "updateTime": "Jul 10, 2015 4:10:35 PM",
          "createdBy": 10436,
          "updatedBy": 10436,
          "origin_id": [
            "Lausanne",
            "dyspnoea"
          ],
          "flowType": "NORMAL",
          "destiny_id": [
            "Lausanne",
            "astma"
          ],
          "others": false,
          "condition": [
            {
              "class": "com.biit.webforms.persistence.entity.condition.TokenComparationAnswer",
              "comparationId": "3edec132-4be1-4d4b-97a7-929efc7e1eb4",
              "creationTime": "Jul 10, 2015 4:10:34 PM",
              "updateTime": "Jul 10, 2015 4:13:01 PM",
              "type": "EQ",
              "question_id": [
                "Lausanne",
                "dyspnoea"
              ],
              "answer_id": [
                "Lausanne",
                "dyspnoea",
                "no"
              ]
            }
          ]
        },
        {
          "class": "com.biit.webforms.persistence.entity.Flow",
          "comparationId": "f5dfb1b8-5261-40dc-827e-19acab1bb2b1",
          "creationTime": "Jul 10, 2015 3:18:44 PM",
          "updateTime": "Jul 10, 2015 3:18:44 PM",
          "createdBy": 10436,
          "updatedBy": 10436,
          "origin_id": [
            "HealthLifestyle",
            "glasses_lenses"
          ],
          "flowType": "NORMAL",
          "destiny_id": [
            "HealthLifestyle",
            "hearing_problems"
          ],
          "others": false,
          "condition": [
            {
              "class": "com.biit.webforms.persistence.entity.condition.TokenComparationAnswer",
              "comparationId": "65906dcc-87c1-476b-aaae-725bc2d663fd",
              "creationTime": "Jul 10, 2015 3:18:43 PM",
              "updateTime": "Jul 10, 2015 3:22:53 PM",
              "type": "EQ",
              "question_id": [
                "HealthLifestyle",
                "glasses_lenses"
              ],
              "answer_id": [
                "HealthLifestyle",
                "glasses_lenses",
                "no"
              ]
            }
          ]
        },
        {
          "class": "com.biit.webforms.persistence.entity.Flow",
          "comparationId": "9851c0c7-c971-494c-ada9-89e8b3596887",
          "creationTime": "Jul 10, 2015 1:49:06 PM",
          "updateTime": "Jul 10, 2015 1:49:06 PM",
          "createdBy": 10436,
          "updatedBy": 10436,
          "origin_id": [
            "IllnessInjury",
            "operation"
          ],
          "flowType": "NORMAL",
          "destiny_id": [
            "IllnessInjury",
            "sport_accident"
          ],
          "others": false,
          "condition": [
            {
              "class": "com.biit.webforms.persistence.entity.condition.TokenComparationAnswer",
              "comparationId": "2ab5b699-ff1e-4eb8-ae68-9ca848135a7d",
              "creationTime": "Jul 10, 2015 1:49:05 PM",
              "updateTime": "Jul 10, 2015 1:53:52 PM",
              "type": "EQ",
              "question_id": [
                "IllnessInjury",
                "operation"
              ],
              "answer_id": [
                "IllnessInjury",
                "operation",
                "no"
              ]
            }
          ]
        },
        {
          "class": "com.biit.webforms.persistence.entity.Flow",
          "comparationId": "e3d4cf6a-f68a-4a0c-986b-b94b858d57ca",
          "creationTime": "Jul 10, 2015 1:50:30 PM",
          "updateTime": "Jul 10, 2015 1:50:30 PM",
          "createdBy": 10436,
          "updatedBy": 10436,
          "origin_id": [
            "IllnessInjury",
            "accident"
          ],
          "flowType": "NORMAL",
          "destiny_id": [
            "IllnessInjury",
            "specialist"
          ],
          "others": false,
          "condition": [
            {
              "class": "com.biit.webforms.persistence.entity.condition.TokenComparationAnswer",
              "comparationId": "ee5a6ccd-00cc-4413-9b1e-105eb43a028a",
              "creationTime": "Jul 10, 2015 1:50:29 PM",
              "updateTime": "Jul 10, 2015 1:53:52 PM",
              "type": "EQ",
              "question_id": [
                "IllnessInjury",
                "accident"
              ],
              "answer_id": [
                "IllnessInjury",
                "accident",
                "no"
              ]
            }
          ]
        },
        {
          "class": "com.biit.webforms.persistence.entity.Flow",
          "comparationId": "d5f9899a-b6bc-4b4c-9e2a-d5b228124fa1",
          "creationTime": "Jul 10, 2015 4:05:50 PM",
          "updateTime": "Jul 10, 2015 4:05:50 PM",
          "createdBy": 10436,
          "updatedBy": 10436,
          "origin_id": [
            "Lausanne",
            "dizziness"
          ],
          "flowType": "NORMAL",
          "destiny_id": [
            "Lausanne",
            "dizziness_details"
          ],
          "others": false,
          "condition": [
            {
              "class": "com.biit.webforms.persistence.entity.condition.TokenComparationAnswer",
              "comparationId": "d7a63bf1-0d05-408a-a62b-f1e7e3bdf7ba",
              "creationTime": "Jul 10, 2015 4:05:47 PM",
              "updateTime": "Jul 10, 2015 4:06:50 PM",
              "type": "EQ",
              "question_id": [
                "Lausanne",
                "dizziness"
              ],
              "answer_id": [
                "Lausanne",
                "dizziness",
                "yes"
              ]
            }
          ]
        },
        {
          "class": "com.biit.webforms.persistence.entity.Flow",
          "comparationId": "b9be272f-c8f8-4d02-8ed0-bbad7e6c49b5",
          "creationTime": "Jul 9, 2015 4:12:56 PM",
          "updateTime": "Mar 24, 2016 12:13:23 PM",
          "createdBy": 10436,
          "updatedBy": 10436,
          "origin_id": [
            "Appointment",
            "info_appointment"
          ],
          "flowType": "NORMAL",
          "destiny_id": [
            "Appointment",
            "info_examination_extended"
          ],
          "others": false,
          "condition": [
            {
              "class": "com.biit.webforms.persistence.entity.condition.TokenComparationAnswer",
              "comparationId": "7e837e49-7dc4-4178-b5bb-3a2b56598649",
              "creationTime": "Oct 20, 2015 5:54:27 PM",
              "updateTime": "Jan 3, 2018 2:54:00 PM",
              "type": "NE",
              "question_id": [
                "Reason",
                "reason"
              ],
              "answer_id": [
                "Reason",
                "reason",
                "screening_examinations"
              ]
            },
            {
              "class": "com.biit.webforms.persistence.entity.condition.Token",
              "comparationId": "16cb2d5c-0325-4b6e-b24e-6d533e89aac2",
              "creationTime": "Oct 20, 2015 5:54:29 PM",
              "updateTime": "Jan 3, 2018 2:54:00 PM",
              "type": "AND"
            },
            {
              "class": "com.biit.webforms.persistence.entity.condition.TokenComparationAnswer",
              "comparationId": "785871ff-d0b6-49f1-ab5d-ba87bdc11160",
              "creationTime": "Mar 24, 2016 12:13:07 PM",
              "updateTime": "Jan 3, 2018 2:54:00 PM",
              "type": "NE",
              "question_id": [
                "Reason",
                "reason"
              ],
              "answer_id": [
                "Reason",
                "reason",
                "cios"
              ]
            },
            {
              "class": "com.biit.webforms.persistence.entity.condition.Token",
              "comparationId": "d9761ad5-9d4a-4807-8c21-65842f912096",
              "creationTime": "Mar 24, 2016 12:13:10 PM",
              "updateTime": "Jan 3, 2018 2:54:00 PM",
              "type": "AND"
            },
            {
              "class": "com.biit.webforms.persistence.entity.condition.TokenComparationAnswer",
              "comparationId": "ac60a086-8da7-4755-ae05-c91bee9114a7",
              "creationTime": "Mar 24, 2016 12:13:14 PM",
              "updateTime": "Jan 3, 2018 2:54:00 PM",
              "type": "NE",
              "question_id": [
                "Reason",
                "reason"
              ],
              "answer_id": [
                "Reason",
                "reason",
                "veva"
              ]
            },
            {
              "class": "com.biit.webforms.persistence.entity.condition.Token",
              "comparationId": "e4c27b92-af49-442c-8ad7-a88168c7933f",
              "creationTime": "Mar 24, 2016 12:13:17 PM",
              "updateTime": "Jan 3, 2018 2:54:00 PM",
              "type": "AND"
            },
            {
              "class": "com.biit.webforms.persistence.entity.condition.TokenComparationValue",
              "comparationId": "f9e18e9b-89f8-4a4a-83b8-a77cc6497262",
              "creationTime": "Oct 20, 2015 5:54:41 PM",
              "updateTime": "Oct 20, 2015 5:54:41 PM",
              "createdBy": 10436,
              "updatedBy": 10436,
              "type": "GT",
              "question_id": [
                "PersonalDetails",
                "profile_birthday"
              ],
              "subformat": "DATE_PERIOD",
              "datePeriodUnit": "YEAR",
              "value": "35"
            }
          ]
        },
        {
          "class": "com.biit.webforms.persistence.entity.Flow",
          "comparationId": "de58d536-4bc1-44f0-ae2d-fac5d530b130",
          "creationTime": "Jul 10, 2015 4:11:03 PM",
          "updateTime": "Jul 10, 2015 4:11:03 PM",
          "createdBy": 10436,
          "updatedBy": 10436,
          "origin_id": [
            "Lausanne",
            "astma"
          ],
          "flowType": "NORMAL",
          "destiny_id": [
            "Lausanne",
            "virusinfection"
          ],
          "others": false,
          "condition": [
            {
              "class": "com.biit.webforms.persistence.entity.condition.TokenComparationAnswer",
              "comparationId": "70e592f8-f215-489c-aeeb-bde3b16e0863",
              "creationTime": "Jul 10, 2015 4:11:02 PM",
              "updateTime": "Jul 10, 2015 4:13:01 PM",
              "type": "EQ",
              "question_id": [
                "Lausanne",
                "astma"
              ],
              "answer_id": [
                "Lausanne",
                "astma",
                "no"
              ]
            }
          ]
        },
        {
          "class": "com.biit.webforms.persistence.entity.Flow",
          "comparationId": "4cfa5b7c-e824-4360-bbcb-6a61ccc68768",
          "creationTime": "Jul 10, 2015 3:22:14 PM",
          "updateTime": "Jul 10, 2015 3:22:14 PM",
          "createdBy": 10436,
          "updatedBy": 10436,
          "origin_id": [
            "HealthLifestyle",
            "smoke"
          ],
          "flowType": "NORMAL",
          "destiny_id": [
            "HealthLifestyle",
            "allergic"
          ],
          "others": false,
          "condition": [
            {
              "class": "com.biit.webforms.persistence.entity.condition.TokenComparationAnswer",
              "comparationId": "c8dc9cff-4dba-47fe-b50a-d0ac9e8002bc",
              "creationTime": "Jul 10, 2015 3:22:13 PM",
              "updateTime": "Jul 10, 2015 3:22:53 PM",
              "type": "EQ",
              "question_id": [
                "HealthLifestyle",
                "smoke"
              ],
              "answer_id": [
                "HealthLifestyle",
                "smoke",
                "no"
              ]
            }
          ]
        },
        {
          "class": "com.biit.webforms.persistence.entity.Flow",
          "comparationId": "dfb917aa-a273-40ac-8424-a5870809c1f2",
          "creationTime": "Jul 10, 2015 4:17:50 PM",
          "updateTime": "Jul 10, 2015 4:17:50 PM",
          "createdBy": 10436,
          "updatedBy": 10436,
          "origin_id": [
            "FamilyHistoryAnamnesis",
            "heart_surgery"
          ],
          "flowType": "NORMAL",
          "destiny_id": [
            "FamilyHistoryAnamnesis",
            "pacemaker"
          ],
          "others": false,
          "condition": [
            {
              "class": "com.biit.webforms.persistence.entity.condition.TokenComparationAnswer",
              "comparationId": "cff94cc8-86f2-4c53-9995-cc3472af5288",
              "creationTime": "Jul 10, 2015 4:17:49 PM",
              "updateTime": "Jul 10, 2015 4:19:26 PM",
              "type": "EQ",
              "question_id": [
                "FamilyHistoryAnamnesis",
                "heart_surgery"
              ],
              "answer_id": [
                "FamilyHistoryAnamnesis",
                "heart_surgery",
                "no"
              ]
            }
          ]
        },
        {
          "class": "com.biit.webforms.persistence.entity.Flow",
          "comparationId": "e3882f12-a08a-4ddb-998d-2b380389be0c",
          "creationTime": "Jul 10, 2015 4:08:53 PM",
          "updateTime": "Jul 10, 2015 4:08:53 PM",
          "createdBy": 10436,
          "updatedBy": 10436,
          "origin_id": [
            "Lausanne",
            "arrhythmia"
          ],
          "flowType": "NORMAL",
          "destiny_id": [
            "Lausanne",
            "heartmurmurs"
          ],
          "others": false,
          "condition": [
            {
              "class": "com.biit.webforms.persistence.entity.condition.TokenComparationAnswer",
              "comparationId": "497d8c88-ec38-467e-80df-c1f204cfeeb5",
              "creationTime": "Jul 10, 2015 4:08:52 PM",
              "updateTime": "Jul 10, 2015 4:13:01 PM",
              "type": "EQ",
              "question_id": [
                "Lausanne",
                "arrhythmia"
              ],
              "answer_id": [
                "Lausanne",
                "arrhythmia",
                "no"
              ]
            }
          ]
        },
        {
          "class": "com.biit.webforms.persistence.entity.Flow",
          "comparationId": "49a418e3-26eb-46ab-aa23-db30329096d4",
          "creationTime": "Jul 10, 2015 3:17:14 PM",
          "updateTime": "Jul 10, 2015 3:17:14 PM",
          "createdBy": 10436,
          "updatedBy": 10436,
          "origin_id": [
            "HealthLifestyle",
            "often_cold"
          ],
          "flowType": "NORMAL",
          "destiny_id": [
            "HealthLifestyle",
            "cough_a_lot"
          ],
          "others": false,
          "condition": [
            {
              "class": "com.biit.webforms.persistence.entity.condition.TokenComparationAnswer",
              "comparationId": "5e6a0598-b0d9-47ad-ac15-b70ca80f3b2d",
              "creationTime": "Jul 10, 2015 3:17:07 PM",
              "updateTime": "Jul 10, 2015 3:22:53 PM",
              "type": "EQ",
              "question_id": [
                "HealthLifestyle",
                "often_cold"
              ],
              "answer_id": [
                "HealthLifestyle",
                "often_cold",
                "no"
              ]
            }
          ]
        },
        {
          "class": "com.biit.webforms.persistence.entity.Flow",
          "comparationId": "85eff5a0-0868-4ead-8ffa-e4456ca48033",
          "creationTime": "Mar 31, 2015 12:44:38 PM",
          "updateTime": "Mar 31, 2015 12:44:38 PM",
          "createdBy": 10436,
          "updatedBy": 10436,
          "origin_id": [
            "Reason",
            "reason"
          ],
          "flowType": "NORMAL",
          "destiny_id": [
            "Reason",
            "screening_examinations"
          ],
          "others": false,
          "condition": [
            {
              "class": "com.biit.webforms.persistence.entity.condition.TokenComparationAnswer",
              "comparationId": "2fe74217-f9f6-4e1b-821b-70fca54446a2",
              "creationTime": "Mar 31, 2015 12:44:23 PM",
              "updateTime": "Jun 2, 2015 11:08:58 AM",
              "type": "EQ",
              "question_id": [
                "Reason",
                "reason"
              ],
              "answer_id": [
                "Reason",
                "reason",
                "screening_examinations"
              ]
            }
          ]
        },
        {
          "class": "com.biit.webforms.persistence.entity.Flow",
          "comparationId": "277c62e2-8181-437c-ad1d-bfa844a53f48",
          "creationTime": "Jul 10, 2015 1:50:45 PM",
          "updateTime": "Jul 10, 2015 1:50:45 PM",
          "createdBy": 10436,
          "updatedBy": 10436,
          "origin_id": [
            "IllnessInjury",
            "specialist"
          ],
          "flowType": "NORMAL",
          "destiny_id": [
            "IllnessInjury",
            "specialist_details"
          ],
          "others": false,
          "condition": [
            {
              "class": "com.biit.webforms.persistence.entity.condition.TokenComparationAnswer",
              "comparationId": "a626df4e-8663-43de-8b65-2c56b5a56781",
              "creationTime": "Jul 10, 2015 1:50:44 PM",
              "updateTime": "Jul 10, 2015 1:53:52 PM",
              "type": "EQ",
              "question_id": [
                "IllnessInjury",
                "specialist"
              ],
              "answer_id": [
                "IllnessInjury",
                "specialist",
                "yes"
              ]
            }
          ]
        },
        {
          "class": "com.biit.webforms.persistence.entity.Flow",
          "comparationId": "1589bd38-b007-47c4-987b-9fc5e65e2b15",
          "creationTime": "Mar 31, 2015 12:45:20 PM",
          "updateTime": "Jul 9, 2015 3:43:56 PM",
          "createdBy": 10436,
          "updatedBy": 10436,
          "origin_id": [
            "Reason",
            "reason_extra"
          ],
          "flowType": "NORMAL",
          "destiny_id": [
            "PersonalDetails",
            "profile_first_name"
          ],
          "others": false,
          "condition": []
        },
        {
          "class": "com.biit.webforms.persistence.entity.Flow",
          "comparationId": "2f39b62c-bc7c-4546-858c-68161665b52e",
          "creationTime": "Jul 10, 2015 4:15:37 PM",
          "updateTime": "Jul 10, 2015 4:15:37 PM",
          "createdBy": 10436,
          "updatedBy": 10436,
          "origin_id": [
            "FamilyHistoryAnamnesis",
            "absences"
          ],
          "flowType": "NORMAL",
          "destiny_id": [
            "FamilyHistoryAnamnesis",
            "absences_details"
          ],
          "others": false,
          "condition": [
            {
              "class": "com.biit.webforms.persistence.entity.condition.TokenComparationAnswer",
              "comparationId": "9df47b5f-5f91-4d36-8711-4af3ad0d1d28",
              "creationTime": "Jul 10, 2015 4:15:36 PM",
              "updateTime": "Jul 10, 2015 4:19:26 PM",
              "type": "EQ",
              "question_id": [
                "FamilyHistoryAnamnesis",
                "absences"
              ],
              "answer_id": [
                "FamilyHistoryAnamnesis",
                "absences",
                "yes"
              ]
            }
          ]
        },
        {
          "class": "com.biit.webforms.persistence.entity.Flow",
          "comparationId": "9fe6e7f8-f119-4b90-b10b-cef2b40fb87b",
          "creationTime": "Jul 10, 2015 4:11:45 PM",
          "updateTime": "Jul 10, 2015 4:11:45 PM",
          "createdBy": 10436,
          "updatedBy": 10436,
          "origin_id": [
            "Lausanne",
            "rheumatism"
          ],
          "flowType": "NORMAL",
          "destiny_id": [
            "Lausanne",
            "rheumatism_details"
          ],
          "others": false,
          "condition": [
            {
              "class": "com.biit.webforms.persistence.entity.condition.TokenComparationAnswer",
              "comparationId": "b5c3888b-380e-4aef-b4f9-cc6cebed272f",
              "creationTime": "Jul 10, 2015 4:11:44 PM",
              "updateTime": "Jul 10, 2015 4:13:01 PM",
              "type": "EQ",
              "question_id": [
                "Lausanne",
                "rheumatism"
              ],
              "answer_id": [
                "Lausanne",
                "rheumatism",
                "yes"
              ]
            }
          ]
        },
        {
          "class": "com.biit.webforms.persistence.entity.Flow",
          "comparationId": "c7385622-3310-4a12-b352-7c1d0b71558a",
          "creationTime": "Jul 10, 2015 4:21:12 PM",
          "updateTime": "Oct 20, 2015 2:56:27 PM",
          "createdBy": 10436,
          "updatedBy": 10436,
          "origin_id": [
            "FamilyHistoryAnamnesis",
            "marfan_syndrome"
          ],
          "flowType": "NORMAL",
          "destiny_id": [
            "FamilyHistoryAnamnesis",
            "EndFamilyStory"
          ],
          "others": false,
          "condition": [
            {
              "class": "com.biit.webforms.persistence.entity.condition.TokenComparationAnswer",
              "comparationId": "a650831c-9d26-4dec-98ba-88f29bcd1339",
              "creationTime": "Jul 10, 2015 4:21:11 PM",
              "updateTime": "Jul 10, 2015 4:21:15 PM",
              "type": "EQ",
              "question_id": [
                "FamilyHistoryAnamnesis",
                "marfan_syndrome"
              ],
              "answer_id": [
                "FamilyHistoryAnamnesis",
                "marfan_syndrome",
                "no"
              ]
            }
          ]
        },
        {
          "class": "com.biit.webforms.persistence.entity.Flow",
          "comparationId": "66804158-441a-4f1e-93a5-32057df4af33",
          "creationTime": "Jul 10, 2015 4:10:06 PM",
          "updateTime": "Jul 10, 2015 4:10:06 PM",
          "createdBy": 10436,
          "updatedBy": 10436,
          "origin_id": [
            "Lausanne",
            "cardiopathy"
          ],
          "flowType": "NORMAL",
          "destiny_id": [
            "Lausanne",
            "dyspnoea"
          ],
          "others": false,
          "condition": [
            {
              "class": "com.biit.webforms.persistence.entity.condition.TokenComparationAnswer",
              "comparationId": "6adbd071-cc13-4aae-935a-14822cc1ca64",
              "creationTime": "Jul 10, 2015 4:10:05 PM",
              "updateTime": "Jul 10, 2015 4:13:01 PM",
              "type": "EQ",
              "question_id": [
                "Lausanne",
                "cardiopathy"
              ],
              "answer_id": [
                "Lausanne",
                "cardiopathy",
                "no"
              ]
            }
          ]
        },
        {
          "class": "com.biit.webforms.persistence.entity.Flow",
          "comparationId": "23dde1ba-ef25-418e-b811-e864b7123440",
          "creationTime": "Jul 10, 2015 4:18:43 PM",
          "updateTime": "Jul 10, 2015 4:18:43 PM",
          "createdBy": 10436,
          "updatedBy": 10436,
          "origin_id": [
            "FamilyHistoryAnamnesis",
            "arrhythmia"
          ],
          "flowType": "NORMAL",
          "destiny_id": [
            "FamilyHistoryAnamnesis",
            "arrhythmia_details"
          ],
          "others": false,
          "condition": [
            {
              "class": "com.biit.webforms.persistence.entity.condition.TokenComparationAnswer",
              "comparationId": "fff7ed78-aff6-4558-8be4-69a3794b3754",
              "creationTime": "Jul 10, 2015 4:18:41 PM",
              "updateTime": "Jul 10, 2015 4:19:26 PM",
              "type": "EQ",
              "question_id": [
                "FamilyHistoryAnamnesis",
                "arrhythmia"
              ],
              "answer_id": [
                "FamilyHistoryAnamnesis",
                "arrhythmia",
                "yes"
              ]
            }
          ]
        },
        {
          "class": "com.biit.webforms.persistence.entity.Flow",
          "comparationId": "3a2e9270-2917-4397-8e60-df895a232ef3",
          "creationTime": "Jul 10, 2015 1:53:50 PM",
          "updateTime": "Oct 20, 2015 1:43:27 PM",
          "createdBy": 10436,
          "updatedBy": 10436,
          "origin_id": [
            "IllnessInjury",
            "injured"
          ],
          "flowType": "NORMAL",
          "destiny_id": [
            "IllnessInjury",
            "EndIllnessinjury"
          ],
          "others": false,
          "condition": [
            {
              "class": "com.biit.webforms.persistence.entity.condition.TokenComparationAnswer",
              "comparationId": "a18c33cc-2a36-4eb8-929d-930e457226f3",
              "creationTime": "Jul 10, 2015 1:53:49 PM",
              "updateTime": "Jul 10, 2015 1:53:52 PM",
              "type": "EQ",
              "question_id": [
                "IllnessInjury",
                "injured"
              ],
              "answer_id": [
                "IllnessInjury",
                "injured",
                "no"
              ]
            }
          ]
        },
        {
          "class": "com.biit.webforms.persistence.entity.Flow",
          "comparationId": "3a92dc4e-2006-44b5-8e95-0374a5a20292",
          "creationTime": "Jun 2, 2015 4:42:59 PM",
          "updateTime": "Jun 2, 2015 4:43:14 PM",
          "createdBy": 10436,
          "updatedBy": 10436,
          "origin_id": [
            "Lausanne",
            "chestpain"
          ],
          "flowType": "NORMAL",
          "destiny_id": [
            "Lausanne",
            "exhausted"
          ],
          "others": false,
          "condition": [
            {
              "class": "com.biit.webforms.persistence.entity.condition.TokenComparationAnswer",
              "comparationId": "d51ebd4d-19b2-4480-8c18-144f08162ef0",
              "creationTime": "Jun 2, 2015 4:43:11 PM",
              "updateTime": "Jul 9, 2015 3:41:55 PM",
              "type": "EQ",
              "question_id": [
                "Lausanne",
                "chestpain"
              ],
              "answer_id": [
                "Lausanne",
                "chestpain",
                "no"
              ]
            }
          ]
        },
        {
          "class": "com.biit.webforms.persistence.entity.Flow",
          "comparationId": "ee9c2343-02fb-4760-b437-ec1a9473a323",
          "creationTime": "Jul 10, 2015 3:17:45 PM",
          "updateTime": "Jul 10, 2015 3:17:45 PM",
          "createdBy": 10436,
          "updatedBy": 10436,
          "origin_id": [
            "HealthLifestyle",
            "cough_a_lot"
          ],
          "flowType": "NORMAL",
          "destiny_id": [
            "HealthLifestyle",
            "cough_blood_mocus"
          ],
          "others": false,
          "condition": [
            {
              "class": "com.biit.webforms.persistence.entity.condition.TokenComparationAnswer",
              "comparationId": "008497dd-f4bd-458e-8ff7-3df41bc45f02",
              "creationTime": "Jul 10, 2015 3:17:44 PM",
              "updateTime": "Jul 10, 2015 3:22:53 PM",
              "type": "EQ",
              "question_id": [
                "HealthLifestyle",
                "cough_a_lot"
              ],
              "answer_id": [
                "HealthLifestyle",
                "cough_a_lot",
                "no"
              ]
            }
          ]
        },
        {
          "class": "com.biit.webforms.persistence.entity.Flow",
          "comparationId": "f04c11cf-974c-4d42-a1bb-828cc05856fb",
          "creationTime": "Jul 9, 2015 4:08:46 PM",
          "updateTime": "Oct 20, 2015 5:55:18 PM",
          "createdBy": 10436,
          "updatedBy": 10436,
          "origin_id": [
            "Appointment",
            "info_appointment"
          ],
          "flowType": "NORMAL",
          "destiny_id": [
            "Appointment",
            "info_examination_plus"
          ],
          "others": true
        },
        {
          "class": "com.biit.webforms.persistence.entity.Flow",
          "comparationId": "2d0ad805-9b30-45cb-a522-ecac985d70a5",
          "creationTime": "Jul 10, 2015 4:16:09 PM",
          "updateTime": "Jul 10, 2015 4:16:09 PM",
          "createdBy": 10436,
          "updatedBy": 10436,
          "origin_id": [
            "FamilyHistoryAnamnesis",
            "drowning"
          ],
          "flowType": "NORMAL",
          "destiny_id": [
            "FamilyHistoryAnamnesis",
            "drowning_details"
          ],
          "others": false,
          "condition": [
            {
              "class": "com.biit.webforms.persistence.entity.condition.TokenComparationAnswer",
              "comparationId": "6e4285cf-2bde-4e14-a359-234a96bf4df3",
              "creationTime": "Jul 10, 2015 4:16:08 PM",
              "updateTime": "Jul 10, 2015 4:19:26 PM",
              "type": "EQ",
              "question_id": [
                "FamilyHistoryAnamnesis",
                "drowning"
              ],
              "answer_id": [
                "FamilyHistoryAnamnesis",
                "drowning",
                "yes"
              ]
            }
          ]
        },
        {
          "class": "com.biit.webforms.persistence.entity.Flow",
          "comparationId": "f4eff2a1-71ff-445f-b847-c7cc3aea07fc",
          "creationTime": "Jul 10, 2015 3:16:53 PM",
          "updateTime": "Jul 10, 2015 3:16:53 PM",
          "createdBy": 10436,
          "updatedBy": 10436,
          "origin_id": [
            "HealthLifestyle",
            "often_cold"
          ],
          "flowType": "NORMAL",
          "destiny_id": [
            "HealthLifestyle",
            "often_cold_details"
          ],
          "others": false,
          "condition": [
            {
              "class": "com.biit.webforms.persistence.entity.condition.TokenComparationAnswer",
              "comparationId": "f8fd14ce-37c0-4240-bd81-430b638c8a9d",
              "creationTime": "Jul 10, 2015 3:16:52 PM",
              "updateTime": "Jul 10, 2015 3:22:53 PM",
              "type": "EQ",
              "question_id": [
                "HealthLifestyle",
                "often_cold"
              ],
              "answer_id": [
                "HealthLifestyle",
                "often_cold",
                "yes"
              ]
            }
          ]
        },
        {
          "class": "com.biit.webforms.persistence.entity.Flow",
          "comparationId": "6b14f45e-6ddc-41b2-941f-075dd7826b7e",
          "creationTime": "Jul 10, 2015 1:51:31 PM",
          "updateTime": "Jul 10, 2015 1:51:31 PM",
          "createdBy": 10436,
          "updatedBy": 10436,
          "origin_id": [
            "IllnessInjury",
            "doctor"
          ],
          "flowType": "NORMAL",
          "destiny_id": [
            "IllnessInjury",
            "rejected"
          ],
          "others": false,
          "condition": [
            {
              "class": "com.biit.webforms.persistence.entity.condition.TokenComparationAnswer",
              "comparationId": "cba3bef5-1919-47dc-bfcf-4040e7dd7e9d",
              "creationTime": "Jul 10, 2015 1:51:31 PM",
              "updateTime": "Jul 10, 2015 1:53:52 PM",
              "type": "EQ",
              "question_id": [
                "IllnessInjury",
                "doctor"
              ],
              "answer_id": [
                "IllnessInjury",
                "doctor",
                "no"
              ]
            }
          ]
        },
        {
          "class": "com.biit.webforms.persistence.entity.Flow",
          "comparationId": "c8eeaa1d-4eed-447a-8bf9-10a9b5acb543",
          "creationTime": "Jun 2, 2015 4:42:08 PM",
          "updateTime": "Oct 20, 2015 2:55:14 PM",
          "createdBy": 10436,
          "updatedBy": 10436,
          "origin_id": [
            "HealthLifestyle",
            "allergic"
          ],
          "flowType": "NORMAL",
          "destiny_id": [
            "HealthLifestyle",
            "EndHealthStyle"
          ],
          "others": false,
          "condition": [
            {
              "class": "com.biit.webforms.persistence.entity.condition.TokenComparationAnswer",
              "comparationId": "a649b2af-7b0c-4b5a-b08f-93d53a8ee8c5",
              "creationTime": "Jun 2, 2015 4:42:30 PM",
              "updateTime": "Jul 9, 2015 3:41:55 PM",
              "type": "EQ",
              "question_id": [
                "HealthLifestyle",
                "allergic"
              ],
              "answer_id": [
                "HealthLifestyle",
                "allergic",
                "no"
              ]
            }
          ]
        },
        {
          "class": "com.biit.webforms.persistence.entity.Flow",
          "comparationId": "7c87913f-a777-4d8a-9e84-ae0db3602d3a",
          "creationTime": "Jul 10, 2015 3:17:59 PM",
          "updateTime": "Jul 10, 2015 3:17:59 PM",
          "createdBy": 10436,
          "updatedBy": 10436,
          "origin_id": [
            "HealthLifestyle",
            "cough_blood_mocus"
          ],
          "flowType": "NORMAL",
          "destiny_id": [
            "HealthLifestyle",
            "cough_blood_mocus_details"
          ],
          "others": false,
          "condition": [
            {
              "class": "com.biit.webforms.persistence.entity.condition.TokenComparationAnswer",
              "comparationId": "a3d66e2b-c79d-4fae-9d82-fa0b6ef347f8",
              "creationTime": "Jul 10, 2015 3:17:58 PM",
              "updateTime": "Jul 10, 2015 3:22:53 PM",
              "type": "EQ",
              "question_id": [
                "HealthLifestyle",
                "cough_blood_mocus"
              ],
              "answer_id": [
                "HealthLifestyle",
                "cough_blood_mocus",
                "yes"
              ]
            }
          ]
        },
        {
          "class": "com.biit.webforms.persistence.entity.Flow",
          "comparationId": "8ebec154-b5ef-41c4-b62a-7e957a76203b",
          "creationTime": "Jul 10, 2015 4:16:23 PM",
          "updateTime": "Jul 10, 2015 4:16:23 PM",
          "createdBy": 10436,
          "updatedBy": 10436,
          "origin_id": [
            "FamilyHistoryAnamnesis",
            "drowning"
          ],
          "flowType": "NORMAL",
          "destiny_id": [
            "FamilyHistoryAnamnesis",
            "traffic_accidents"
          ],
          "others": false,
          "condition": [
            {
              "class": "com.biit.webforms.persistence.entity.condition.TokenComparationAnswer",
              "comparationId": "e5525392-8312-452f-b064-7d614209ee7c",
              "creationTime": "Jul 10, 2015 4:16:22 PM",
              "updateTime": "Jul 10, 2015 4:19:26 PM",
              "type": "EQ",
              "question_id": [
                "FamilyHistoryAnamnesis",
                "drowning"
              ],
              "answer_id": [
                "FamilyHistoryAnamnesis",
                "drowning",
                "no"
              ]
            }
          ]
        },
        {
          "class": "com.biit.webforms.persistence.entity.Flow",
          "comparationId": "cf0a4ccb-75d0-4922-a8d1-b7150e773357",
          "creationTime": "Jul 10, 2015 1:51:17 PM",
          "updateTime": "Jul 10, 2015 1:51:17 PM",
          "createdBy": 10436,
          "updatedBy": 10436,
          "origin_id": [
            "IllnessInjury",
            "doctor"
          ],
          "flowType": "NORMAL",
          "destiny_id": [
            "IllnessInjury",
            "doctor_details"
          ],
          "others": false,
          "condition": [
            {
              "class": "com.biit.webforms.persistence.entity.condition.TokenComparationAnswer",
              "comparationId": "4fd3ff87-fec3-40bf-adc2-86ab02b45608",
              "creationTime": "Jul 10, 2015 1:51:16 PM",
              "updateTime": "Jul 10, 2015 1:53:52 PM",
              "type": "EQ",
              "question_id": [
                "IllnessInjury",
                "doctor"
              ],
              "answer_id": [
                "IllnessInjury",
                "doctor",
                "yes"
              ]
            }
          ]
        },
        {
          "class": "com.biit.webforms.persistence.entity.Flow",
          "comparationId": "502bb32d-1852-4371-a9da-f4b70a3f4a17",
          "creationTime": "Jul 10, 2015 4:09:16 PM",
          "updateTime": "Jul 10, 2015 4:09:16 PM",
          "createdBy": 10436,
          "updatedBy": 10436,
          "origin_id": [
            "Lausanne",
            "heartmurmurs"
          ],
          "flowType": "NORMAL",
          "destiny_id": [
            "Lausanne",
            "heartmurmurs_details"
          ],
          "others": false,
          "condition": [
            {
              "class": "com.biit.webforms.persistence.entity.condition.TokenComparationAnswer",
              "comparationId": "8a83a5f0-6855-43a9-8c6f-01df8ffaafba",
              "creationTime": "Jul 10, 2015 4:09:15 PM",
              "updateTime": "Jul 10, 2015 4:13:01 PM",
              "type": "EQ",
              "question_id": [
                "Lausanne",
                "heartmurmurs"
              ],
              "answer_id": [
                "Lausanne",
                "heartmurmurs",
                "yes"
              ]
            }
          ]
        },
        {
          "class": "com.biit.webforms.persistence.entity.Flow",
          "comparationId": "26778b06-c0c4-415a-9d85-0eae54b38ca6",
          "creationTime": "Mar 22, 2016 12:22:58 PM",
          "updateTime": "Mar 22, 2016 12:22:58 PM",
          "createdBy": 10436,
          "updatedBy": 10436,
          "origin_id": [
            "Appointment",
            "info_examination_extended"
          ],
          "flowType": "NORMAL",
          "destiny_id": [
            "Appointment",
            "info_end"
          ],
          "others": false,
          "condition": []
        },
        {
          "class": "com.biit.webforms.persistence.entity.Flow",
          "comparationId": "9d8bd2b4-5839-4421-b4d5-088a436acbc9",
          "creationTime": "Mar 31, 2015 12:44:00 PM",
          "updateTime": "Mar 31, 2015 12:44:00 PM",
          "createdBy": 10436,
          "updatedBy": 10436,
          "origin_id": [
            "Reason",
            "reason"
          ],
          "flowType": "NORMAL",
          "destiny_id": [
            "Reason",
            "reason_extra"
          ],
          "others": false,
          "condition": [
            {
              "class": "com.biit.webforms.persistence.entity.condition.TokenComparationAnswer",
              "comparationId": "6e77d0a6-db04-4002-b94d-c13e49b5a732",
              "creationTime": "Mar 31, 2015 12:43:48 PM",
              "updateTime": "Jun 2, 2015 11:08:58 AM",
              "type": "EQ",
              "question_id": [
                "Reason",
                "reason"
              ],
              "answer_id": [
                "Reason",
                "reason",
                "others"
              ]
            }
          ]
        },
        {
          "class": "com.biit.webforms.persistence.entity.Flow",
          "comparationId": "617f83b9-1277-4449-979f-97a06303782f",
          "creationTime": "Jul 10, 2015 3:20:58 PM",
          "updateTime": "Jul 10, 2015 3:20:58 PM",
          "createdBy": 10436,
          "updatedBy": 10436,
          "origin_id": [
            "HealthLifestyle",
            "medication"
          ],
          "flowType": "NORMAL",
          "destiny_id": [
            "HealthLifestyle",
            "alcohol"
          ],
          "others": false,
          "condition": [
            {
              "class": "com.biit.webforms.persistence.entity.condition.TokenComparationAnswer",
              "comparationId": "a3b633c7-8c5d-4811-b69b-2a7d2d38a75b",
              "creationTime": "Jul 10, 2015 3:20:57 PM",
              "updateTime": "Jul 10, 2015 3:22:53 PM",
              "type": "EQ",
              "question_id": [
                "HealthLifestyle",
                "medication"
              ],
              "answer_id": [
                "HealthLifestyle",
                "medication",
                "no"
              ]
            }
          ]
        },
        {
          "class": "com.biit.webforms.persistence.entity.Flow",
          "comparationId": "e51e8e2c-d5d0-4efb-9159-9fd25a22c8f2",
          "creationTime": "Jul 10, 2015 1:49:28 PM",
          "updateTime": "Jul 10, 2015 1:49:28 PM",
          "createdBy": 10436,
          "updatedBy": 10436,
          "origin_id": [
            "IllnessInjury",
            "sport_accident"
          ],
          "flowType": "NORMAL",
          "destiny_id": [
            "IllnessInjury",
            "sport_accident_details"
          ],
          "others": false,
          "condition": [
            {
              "class": "com.biit.webforms.persistence.entity.condition.TokenComparationAnswer",
              "comparationId": "0b0d74e7-63c1-46f7-8d4d-09e85a3b3e5e",
              "creationTime": "Jul 10, 2015 1:49:26 PM",
              "updateTime": "Jul 10, 2015 1:53:52 PM",
              "type": "EQ",
              "question_id": [
                "IllnessInjury",
                "sport_accident"
              ],
              "answer_id": [
                "IllnessInjury",
                "sport_accident",
                "yes"
              ]
            }
          ]
        },
        {
          "class": "com.biit.webforms.persistence.entity.Flow",
          "comparationId": "82314986-bebe-40c4-a795-c461c26933cf",
          "creationTime": "Jul 10, 2015 4:16:38 PM",
          "updateTime": "Jul 10, 2015 4:16:38 PM",
          "createdBy": 10436,
          "updatedBy": 10436,
          "origin_id": [
            "FamilyHistoryAnamnesis",
            "traffic_accidents"
          ],
          "flowType": "NORMAL",
          "destiny_id": [
            "FamilyHistoryAnamnesis",
            "traffic_accidents_details"
          ],
          "others": false,
          "condition": [
            {
              "class": "com.biit.webforms.persistence.entity.condition.TokenComparationAnswer",
              "comparationId": "088036d9-b534-4857-9136-11bda65f1922",
              "creationTime": "Jul 10, 2015 4:16:37 PM",
              "updateTime": "Jul 10, 2015 4:19:26 PM",
              "type": "EQ",
              "question_id": [
                "FamilyHistoryAnamnesis",
                "traffic_accidents"
              ],
              "answer_id": [
                "FamilyHistoryAnamnesis",
                "traffic_accidents",
                "yes"
              ]
            }
          ]
        },
        {
          "class": "com.biit.webforms.persistence.entity.Flow",
          "comparationId": "8f748238-0396-422d-a539-41b2081ecff6",
          "creationTime": "Jul 10, 2015 4:10:49 PM",
          "updateTime": "Jul 10, 2015 4:10:49 PM",
          "createdBy": 10436,
          "updatedBy": 10436,
          "origin_id": [
            "Lausanne",
            "astma"
          ],
          "flowType": "NORMAL",
          "destiny_id": [
            "Lausanne",
            "astma_details"
          ],
          "others": false,
          "condition": [
            {
              "class": "com.biit.webforms.persistence.entity.condition.TokenComparationAnswer",
              "comparationId": "84dccf17-6b34-4628-9c80-43875a89b146",
              "creationTime": "Jul 10, 2015 4:10:48 PM",
              "updateTime": "Jul 10, 2015 4:13:01 PM",
              "type": "EQ",
              "question_id": [
                "Lausanne",
                "astma"
              ],
              "answer_id": [
                "Lausanne",
                "astma",
                "yes"
              ]
            }
          ]
        },
        {
          "class": "com.biit.webforms.persistence.entity.Flow",
          "comparationId": "03fc44dd-94d5-4598-9655-0cd11f0508b8",
          "creationTime": "Jul 10, 2015 4:20:26 PM",
          "updateTime": "Jul 10, 2015 4:20:26 PM",
          "createdBy": 10436,
          "updatedBy": 10436,
          "origin_id": [
            "FamilyHistoryAnamnesis",
            "diabetes"
          ],
          "flowType": "NORMAL",
          "destiny_id": [
            "FamilyHistoryAnamnesis",
            "diabetes_details"
          ],
          "others": false,
          "condition": [
            {
              "class": "com.biit.webforms.persistence.entity.condition.TokenComparationAnswer",
              "comparationId": "7edab314-9571-42b3-8097-4b55b4973f90",
              "creationTime": "Jul 10, 2015 4:20:25 PM",
              "updateTime": "Jul 10, 2015 4:21:15 PM",
              "type": "EQ",
              "question_id": [
                "FamilyHistoryAnamnesis",
                "diabetes"
              ],
              "answer_id": [
                "FamilyHistoryAnamnesis",
                "diabetes",
                "yes"
              ]
            }
          ]
        },
        {
          "class": "com.biit.webforms.persistence.entity.Flow",
          "comparationId": "e210bcc2-a7de-42d5-977e-7af3c2b9603e",
          "creationTime": "Jul 10, 2015 1:52:20 PM",
          "updateTime": "Jul 10, 2015 1:52:20 PM",
          "createdBy": 10436,
          "updatedBy": 10436,
          "origin_id": [
            "IllnessInjury",
            "flu"
          ],
          "flowType": "NORMAL",
          "destiny_id": [
            "IllnessInjury",
            "flu_details"
          ],
          "others": false,
          "condition": [
            {
              "class": "com.biit.webforms.persistence.entity.condition.TokenComparationAnswer",
              "comparationId": "8cbfbca4-38a5-4fa9-9fda-9625c679a4ca",
              "creationTime": "Jul 10, 2015 1:52:19 PM",
              "updateTime": "Jul 10, 2015 1:53:52 PM",
              "type": "EQ",
              "question_id": [
                "IllnessInjury",
                "flu"
              ],
              "answer_id": [
                "IllnessInjury",
                "flu",
                "yes"
              ]
            }
          ]
        },
        {
          "class": "com.biit.webforms.persistence.entity.Flow",
          "comparationId": "2cc4ea06-4a72-4f02-9ea1-13ccc216c3de",
          "creationTime": "Jul 10, 2015 4:20:12 PM",
          "updateTime": "Jul 10, 2015 4:20:12 PM",
          "createdBy": 10436,
          "updatedBy": 10436,
          "origin_id": [
            "FamilyHistoryAnamnesis",
            "infant_death"
          ],
          "flowType": "NORMAL",
          "destiny_id": [
            "FamilyHistoryAnamnesis",
            "diabetes"
          ],
          "others": false,
          "condition": [
            {
              "class": "com.biit.webforms.persistence.entity.condition.TokenComparationAnswer",
              "comparationId": "edad89df-c703-44c9-8f4e-859f79a4df7a",
              "creationTime": "Jul 10, 2015 4:20:11 PM",
              "updateTime": "Jul 10, 2015 4:21:15 PM",
              "type": "EQ",
              "question_id": [
                "FamilyHistoryAnamnesis",
                "infant_death"
              ],
              "answer_id": [
                "FamilyHistoryAnamnesis",
                "infant_death",
                "no"
              ]
            }
          ]
        },
        {
          "class": "com.biit.webforms.persistence.entity.Flow",
          "comparationId": "5cf9dac2-c0aa-4b40-aff3-7b8d5387e431",
          "creationTime": "Jul 10, 2015 4:09:49 PM",
          "updateTime": "Jul 10, 2015 4:09:49 PM",
          "createdBy": 10436,
          "updatedBy": 10436,
          "origin_id": [
            "Lausanne",
            "cardiopathy"
          ],
          "flowType": "NORMAL",
          "destiny_id": [
            "Lausanne",
            "cardiopathy_details"
          ],
          "others": false,
          "condition": [
            {
              "class": "com.biit.webforms.persistence.entity.condition.TokenComparationAnswer",
              "comparationId": "a78dbae3-92a1-4191-a2c9-9a0d2dc7afd9",
              "creationTime": "Jul 10, 2015 4:09:48 PM",
              "updateTime": "Jul 10, 2015 4:13:01 PM",
              "type": "EQ",
              "question_id": [
                "Lausanne",
                "cardiopathy"
              ],
              "answer_id": [
                "Lausanne",
                "cardiopathy",
                "yes"
              ]
            }
          ]
        },
        {
          "class": "com.biit.webforms.persistence.entity.Flow",
          "comparationId": "f3df0380-e05e-4961-9120-d9d15f7ae9cb",
          "creationTime": "Jul 10, 2015 1:51:02 PM",
          "updateTime": "Jul 10, 2015 1:51:02 PM",
          "createdBy": 10436,
          "updatedBy": 10436,
          "origin_id": [
            "IllnessInjury",
            "specialist"
          ],
          "flowType": "NORMAL",
          "destiny_id": [
            "IllnessInjury",
            "doctor"
          ],
          "others": false,
          "condition": [
            {
              "class": "com.biit.webforms.persistence.entity.condition.TokenComparationAnswer",
              "comparationId": "bb81f462-2928-42d1-b59f-275e40eeb108",
              "creationTime": "Jul 10, 2015 1:51:00 PM",
              "updateTime": "Jul 10, 2015 1:53:52 PM",
              "type": "EQ",
              "question_id": [
                "IllnessInjury",
                "specialist"
              ],
              "answer_id": [
                "IllnessInjury",
                "specialist",
                "no"
              ]
            }
          ]
        },
        {
          "class": "com.biit.webforms.persistence.entity.Flow",
          "comparationId": "25fc5443-3e70-4240-8a16-2767d240d95a",
          "creationTime": "Jul 10, 2015 1:50:11 PM",
          "updateTime": "Jul 10, 2015 1:50:11 PM",
          "createdBy": 10436,
          "updatedBy": 10436,
          "origin_id": [
            "IllnessInjury",
            "accident"
          ],
          "flowType": "NORMAL",
          "destiny_id": [
            "IllnessInjury",
            "accident_details"
          ],
          "others": false,
          "condition": [
            {
              "class": "com.biit.webforms.persistence.entity.condition.TokenComparationAnswer",
              "comparationId": "a3b1a337-46c9-4bf4-bc5f-6fd7617bd7a2",
              "creationTime": "Jul 10, 2015 1:50:09 PM",
              "updateTime": "Jul 10, 2015 1:53:52 PM",
              "type": "EQ",
              "question_id": [
                "IllnessInjury",
                "accident"
              ],
              "answer_id": [
                "IllnessInjury",
                "accident",
                "yes"
              ]
            }
          ]
        },
        {
          "class": "com.biit.webforms.persistence.entity.Flow",
          "comparationId": "cf74b3de-47af-48ab-9d82-fc5c16d876d6",
          "creationTime": "Jul 10, 2015 4:15:53 PM",
          "updateTime": "Jul 10, 2015 4:15:53 PM",
          "createdBy": 10436,
          "updatedBy": 10436,
          "origin_id": [
            "FamilyHistoryAnamnesis",
            "absences"
          ],
          "flowType": "NORMAL",
          "destiny_id": [
            "FamilyHistoryAnamnesis",
            "drowning"
          ],
          "others": false,
          "condition": [
            {
              "class": "com.biit.webforms.persistence.entity.condition.TokenComparationAnswer",
              "comparationId": "a18f2072-d259-4f08-b009-cabc2c3774a6",
              "creationTime": "Jul 10, 2015 4:15:52 PM",
              "updateTime": "Jul 10, 2015 4:19:26 PM",
              "type": "EQ",
              "question_id": [
                "FamilyHistoryAnamnesis",
                "absences"
              ],
              "answer_id": [
                "FamilyHistoryAnamnesis",
                "absences",
                "no"
              ]
            }
          ]
        },
        {
          "class": "com.biit.webforms.persistence.entity.Flow",
          "comparationId": "911fed0a-38a3-4cec-94f8-d1cd319f70fa",
          "creationTime": "Jul 10, 2015 4:20:57 PM",
          "updateTime": "Jul 10, 2015 4:20:57 PM",
          "createdBy": 10436,
          "updatedBy": 10436,
          "origin_id": [
            "FamilyHistoryAnamnesis",
            "marfan_syndrome"
          ],
          "flowType": "NORMAL",
          "destiny_id": [
            "FamilyHistoryAnamnesis",
            "marfan_syndrome_details"
          ],
          "others": false,
          "condition": [
            {
              "class": "com.biit.webforms.persistence.entity.condition.TokenComparationAnswer",
              "comparationId": "cb3aa6bd-d828-4da8-b954-ab3403eff338",
              "creationTime": "Jul 10, 2015 4:20:57 PM",
              "updateTime": "Jul 10, 2015 4:21:15 PM",
              "type": "EQ",
              "question_id": [
                "FamilyHistoryAnamnesis",
                "marfan_syndrome"
              ],
              "answer_id": [
                "FamilyHistoryAnamnesis",
                "marfan_syndrome",
                "yes"
              ]
            }
          ]
        },
        {
          "class": "com.biit.webforms.persistence.entity.Flow",
          "comparationId": "9131d36e-d7df-43d2-9992-cd82428ecdb3",
          "creationTime": "Mar 22, 2016 12:21:10 PM",
          "updateTime": "Mar 24, 2016 11:35:45 AM",
          "createdBy": 10436,
          "updatedBy": 10436,
          "origin_id": [
            "Appointment",
            "info_appointment"
          ],
          "flowType": "NORMAL",
          "destiny_id": [
            "Appointment",
            "info_examination_cios"
          ],
          "others": false,
          "condition": [
            {
              "class": "com.biit.webforms.persistence.entity.condition.TokenComparationAnswer",
              "comparationId": "3dcd642c-b0fa-41e7-b957-091101ead907",
              "creationTime": "Mar 22, 2016 12:21:00 PM",
              "updateTime": "Jan 3, 2018 2:54:00 PM",
              "type": "EQ",
              "question_id": [
                "Reason",
                "reason"
              ],
              "answer_id": [
                "Reason",
                "reason",
                "cios"
              ]
            }
          ]
        },
        {
          "class": "com.biit.webforms.persistence.entity.Flow",
          "comparationId": "a4a76fee-298b-49d9-991c-dbb7276cd101",
          "creationTime": "Jul 10, 2015 4:07:57 PM",
          "updateTime": "Jul 10, 2015 4:07:57 PM",
          "createdBy": 10436,
          "updatedBy": 10436,
          "origin_id": [
            "Lausanne",
            "palpitations"
          ],
          "flowType": "NORMAL",
          "destiny_id": [
            "Lausanne",
            "arrhythmia"
          ],
          "others": false,
          "condition": [
            {
              "class": "com.biit.webforms.persistence.entity.condition.TokenComparationAnswer",
              "comparationId": "13e85b82-a2f1-4fd7-8ce4-f0b762782f2e",
              "creationTime": "Jul 10, 2015 4:07:55 PM",
              "updateTime": "Jul 10, 2015 4:13:01 PM",
              "type": "EQ",
              "question_id": [
                "Lausanne",
                "palpitations"
              ],
              "answer_id": [
                "Lausanne",
                "palpitations",
                "no"
              ]
            }
          ]
        },
        {
          "class": "com.biit.webforms.persistence.entity.Flow",
          "comparationId": "7bd68ecb-53f0-4b9c-9391-0b69ec1b47c2",
          "creationTime": "Jul 10, 2015 4:07:13 PM",
          "updateTime": "Jul 10, 2015 4:07:13 PM",
          "createdBy": 10436,
          "updatedBy": 10436,
          "origin_id": [
            "Lausanne",
            "exhausted"
          ],
          "flowType": "NORMAL",
          "destiny_id": [
            "Lausanne",
            "exhausted_details"
          ],
          "others": false,
          "condition": [
            {
              "class": "com.biit.webforms.persistence.entity.condition.TokenComparationAnswer",
              "comparationId": "2dda0468-1258-4539-b378-676158259d12",
              "creationTime": "Jul 10, 2015 4:07:12 PM",
              "updateTime": "Jul 10, 2015 4:13:01 PM",
              "type": "EQ",
              "question_id": [
                "Lausanne",
                "exhausted"
              ],
              "answer_id": [
                "Lausanne",
                "exhausted",
                "yes"
              ]
            }
          ]
        },
        {
          "class": "com.biit.webforms.persistence.entity.Flow",
          "comparationId": "67f95bcf-9715-4a8a-9bc4-7ec9af9b2b61",
          "creationTime": "Jul 10, 2015 4:19:57 PM",
          "updateTime": "Jul 10, 2015 4:19:57 PM",
          "createdBy": 10436,
          "updatedBy": 10436,
          "origin_id": [
            "FamilyHistoryAnamnesis",
            "infant_death"
          ],
          "flowType": "NORMAL",
          "destiny_id": [
            "FamilyHistoryAnamnesis",
            "infant_death_details"
          ],
          "others": false,
          "condition": [
            {
              "class": "com.biit.webforms.persistence.entity.condition.TokenComparationAnswer",
              "comparationId": "6ec9f805-1f4d-4c1e-816f-da09f881b36a",
              "creationTime": "Jul 10, 2015 4:19:56 PM",
              "updateTime": "Jul 10, 2015 4:21:15 PM",
              "type": "EQ",
              "question_id": [
                "FamilyHistoryAnamnesis",
                "infant_death"
              ],
              "answer_id": [
                "FamilyHistoryAnamnesis",
                "infant_death",
                "yes"
              ]
            }
          ]
        },
        {
          "class": "com.biit.webforms.persistence.entity.Flow",
          "comparationId": "cdbb3def-86d3-40fc-bb10-77ed6bb6f27f",
          "creationTime": "Jul 10, 2015 4:09:33 PM",
          "updateTime": "Jul 10, 2015 4:09:33 PM",
          "createdBy": 10436,
          "updatedBy": 10436,
          "origin_id": [
            "Lausanne",
            "heartmurmurs"
          ],
          "flowType": "NORMAL",
          "destiny_id": [
            "Lausanne",
            "cardiopathy"
          ],
          "others": false,
          "condition": [
            {
              "class": "com.biit.webforms.persistence.entity.condition.TokenComparationAnswer",
              "comparationId": "3e2a96d8-64c1-49c2-a373-6de7850fe215",
              "creationTime": "Jul 10, 2015 4:09:32 PM",
              "updateTime": "Jul 10, 2015 4:13:01 PM",
              "type": "EQ",
              "question_id": [
                "Lausanne",
                "heartmurmurs"
              ],
              "answer_id": [
                "Lausanne",
                "heartmurmurs",
                "no"
              ]
            }
          ]
        },
        {
          "class": "com.biit.webforms.persistence.entity.Flow",
          "comparationId": "5aad0718-1182-4761-9cc3-73da1319c2a5",
          "creationTime": "Jul 10, 2015 4:12:00 PM",
          "updateTime": "Jul 10, 2015 4:13:35 PM",
          "createdBy": 10436,
          "updatedBy": 10436,
          "origin_id": [
            "Lausanne",
            "rheumatism"
          ],
          "flowType": "NORMAL",
          "destiny_id": [
            "Lausanne",
            "high_blood_pressure"
          ],
          "others": false,
          "condition": [
            {
              "class": "com.biit.webforms.persistence.entity.condition.TokenComparationAnswer",
              "comparationId": "de2e8f79-41a2-4193-978a-270f6b8ce65f",
              "creationTime": "Jul 10, 2015 4:13:34 PM",
              "updateTime": "Jul 10, 2015 4:13:54 PM",
              "type": "EQ",
              "question_id": [
                "Lausanne",
                "rheumatism"
              ],
              "answer_id": [
                "Lausanne",
                "rheumatism",
                "no"
              ]
            }
          ]
        },
        {
          "class": "com.biit.webforms.persistence.entity.Flow",
          "comparationId": "ed7cf54f-1776-4964-888a-83372b3f88bb",
          "creationTime": "Jul 10, 2015 3:21:16 PM",
          "updateTime": "Jul 10, 2015 3:21:16 PM",
          "createdBy": 10436,
          "updatedBy": 10436,
          "origin_id": [
            "HealthLifestyle",
            "alcohol"
          ],
          "flowType": "NORMAL",
          "destiny_id": [
            "HealthLifestyle",
            "alcohol_details"
          ],
          "others": false,
          "condition": [
            {
              "class": "com.biit.webforms.persistence.entity.condition.TokenComparationAnswer",
              "comparationId": "b71844ea-1fd2-457e-9e9a-eec13f430003",
              "creationTime": "Jul 10, 2015 3:21:15 PM",
              "updateTime": "Jul 10, 2015 3:22:53 PM",
              "type": "EQ",
              "question_id": [
                "HealthLifestyle",
                "alcohol"
              ],
              "answer_id": [
                "HealthLifestyle",
                "alcohol",
                "yes"
              ]
            }
          ]
        },
        {
          "class": "com.biit.webforms.persistence.entity.Flow",
          "comparationId": "1e3144a8-017c-46fd-89f1-15ffb9fc00aa",
          "creationTime": "Jul 10, 2015 3:21:40 PM",
          "updateTime": "Jul 10, 2015 3:21:40 PM",
          "createdBy": 10436,
          "updatedBy": 10436,
          "origin_id": [
            "HealthLifestyle",
            "alcohol"
          ],
          "flowType": "NORMAL",
          "destiny_id": [
            "HealthLifestyle",
            "smoke"
          ],
          "others": false,
          "condition": [
            {
              "class": "com.biit.webforms.persistence.entity.condition.TokenComparationAnswer",
              "comparationId": "3407b447-22fe-4242-9f91-6af1b9f6ebe4",
              "creationTime": "Jul 10, 2015 3:21:39 PM",
              "updateTime": "Jul 10, 2015 3:22:53 PM",
              "type": "EQ",
              "question_id": [
                "HealthLifestyle",
                "alcohol"
              ],
              "answer_id": [
                "HealthLifestyle",
                "alcohol",
                "no"
              ]
            }
          ]
        },
        {
          "class": "com.biit.webforms.persistence.entity.Flow",
          "comparationId": "8df14fc5-5d13-4641-9846-1f2a124a9637",
          "creationTime": "Jul 10, 2015 1:48:23 PM",
          "updateTime": "Jul 10, 2015 1:48:23 PM",
          "createdBy": 10436,
          "updatedBy": 10436,
          "origin_id": [
            "IllnessInjury",
            "muscle_injury"
          ],
          "flowType": "NORMAL",
          "destiny_id": [
            "IllnessInjury",
            "operation"
          ],
          "others": false,
          "condition": [
            {
              "class": "com.biit.webforms.persistence.entity.condition.TokenComparationAnswer",
              "comparationId": "b7ad57b9-800e-4c0a-a928-2d2ee5338cf7",
              "creationTime": "Jul 10, 2015 1:48:22 PM",
              "updateTime": "Jul 10, 2015 1:53:52 PM",
              "type": "EQ",
              "question_id": [
                "IllnessInjury",
                "muscle_injury"
              ],
              "answer_id": [
                "IllnessInjury",
                "muscle_injury",
                "no"
              ]
            }
          ]
        },
        {
          "class": "com.biit.webforms.persistence.entity.Flow",
          "comparationId": "c7db5c78-4e59-4be9-8973-641f5474ca06",
          "creationTime": "Jul 10, 2015 3:15:26 PM",
          "updateTime": "Jul 10, 2015 3:15:26 PM",
          "createdBy": 10436,
          "updatedBy": 10436,
          "origin_id": [
            "HealthLifestyle",
            "health_issues"
          ],
          "flowType": "NORMAL",
          "destiny_id": [
            "HealthLifestyle",
            "health_issues_details"
          ],
          "others": false,
          "condition": [
            {
              "class": "com.biit.webforms.persistence.entity.condition.TokenComparationAnswer",
              "comparationId": "469882d3-6817-4595-8fbc-a57f0ec9bbd2",
              "creationTime": "Jul 10, 2015 3:15:24 PM",
              "updateTime": "Jul 10, 2015 3:22:53 PM",
              "type": "EQ",
              "question_id": [
                "HealthLifestyle",
                "health_issues"
              ],
              "answer_id": [
                "HealthLifestyle",
                "health_issues",
                "yes"
              ]
            }
          ]
        },
        {
          "class": "com.biit.webforms.persistence.entity.Flow",
          "comparationId": "3a892a01-fcbe-4c5d-84ca-4d4662d35342",
          "creationTime": "Jul 10, 2015 3:19:31 PM",
          "updateTime": "Jul 10, 2015 3:19:31 PM",
          "createdBy": 10436,
          "updatedBy": 10436,
          "origin_id": [
            "HealthLifestyle",
            "urination_problems"
          ],
          "flowType": "NORMAL",
          "destiny_id": [
            "HealthLifestyle",
            "urination_problems_details"
          ],
          "others": false,
          "condition": [
            {
              "class": "com.biit.webforms.persistence.entity.condition.TokenComparationAnswer",
              "comparationId": "fb3d3281-c9f2-43a9-b8ab-73099cf96876",
              "creationTime": "Jul 10, 2015 3:19:30 PM",
              "updateTime": "Jul 10, 2015 3:22:53 PM",
              "type": "EQ",
              "question_id": [
                "HealthLifestyle",
                "urination_problems"
              ],
              "answer_id": [
                "HealthLifestyle",
                "urination_problems",
                "yes"
              ]
            }
          ]
        },
        {
          "class": "com.biit.webforms.persistence.entity.Flow",
          "comparationId": "5cb7d3d6-d28d-4d9f-91c0-c3807608b0ba",
          "creationTime": "Jul 9, 2015 4:08:46 PM",
          "updateTime": "Mar 24, 2016 11:37:26 AM",
          "createdBy": 10436,
          "updatedBy": 10436,
          "origin_id": [
            "Appointment",
            "info_appointment"
          ],
          "flowType": "NORMAL",
          "destiny_id": [
            "Appointment",
            "info_examination_basic"
          ],
          "others": false,
          "condition": [
            {
              "class": "com.biit.webforms.persistence.entity.condition.TokenComparationAnswer",
              "comparationId": "843e58df-49b2-4dc5-a8fd-054010f4b8d6",
              "creationTime": "Oct 20, 2015 5:55:07 PM",
              "updateTime": "Jan 3, 2018 2:54:00 PM",
              "type": "EQ",
              "question_id": [
                "Reason",
                "reason"
              ],
              "answer_id": [
                "Reason",
                "reason",
                "screening_examinations"
              ]
            }
          ]
        },
        {
          "class": "com.biit.webforms.persistence.entity.Flow",
          "comparationId": "a18e79d6-e38a-4ead-91cd-0f276c53c3c2",
          "creationTime": "Jul 10, 2015 3:17:30 PM",
          "updateTime": "Jul 10, 2015 3:17:30 PM",
          "createdBy": 10436,
          "updatedBy": 10436,
          "origin_id": [
            "HealthLifestyle",
            "cough_a_lot"
          ],
          "flowType": "NORMAL",
          "destiny_id": [
            "HealthLifestyle",
            "cough_a_lot_details"
          ],
          "others": false,
          "condition": [
            {
              "class": "com.biit.webforms.persistence.entity.condition.TokenComparationAnswer",
              "comparationId": "c63d91b8-a454-4df8-ae2b-13c0cd1d5f1d",
              "creationTime": "Jul 10, 2015 3:17:29 PM",
              "updateTime": "Jul 10, 2015 3:22:53 PM",
              "type": "EQ",
              "question_id": [
                "HealthLifestyle",
                "cough_a_lot"
              ],
              "answer_id": [
                "HealthLifestyle",
                "cough_a_lot",
                "yes"
              ]
            }
          ]
        },
        {
          "class": "com.biit.webforms.persistence.entity.Flow",
          "comparationId": "a792111b-41d9-4d3f-b128-445accf16495",
          "creationTime": "Jul 10, 2015 3:18:29 PM",
          "updateTime": "Jul 10, 2015 3:18:29 PM",
          "createdBy": 10436,
          "updatedBy": 10436,
          "origin_id": [
            "HealthLifestyle",
            "glasses_lenses"
          ],
          "flowType": "NORMAL",
          "destiny_id": [
            "HealthLifestyle",
            "glasses_lenses_details"
          ],
          "others": false,
          "condition": [
            {
              "class": "com.biit.webforms.persistence.entity.condition.TokenComparationAnswer",
              "comparationId": "b7a1a76e-8e62-4c7c-99fa-b9e53b474a6d",
              "creationTime": "Jul 10, 2015 3:18:28 PM",
              "updateTime": "Jul 10, 2015 3:22:53 PM",
              "type": "EQ",
              "question_id": [
                "HealthLifestyle",
                "glasses_lenses"
              ],
              "answer_id": [
                "HealthLifestyle",
                "glasses_lenses",
                "yes"
              ]
            }
          ]
        },
        {
          "class": "com.biit.webforms.persistence.entity.Flow",
          "comparationId": "4ac20a88-ea4c-4994-9c43-41b28f1b15d1",
          "creationTime": "Jul 10, 2015 4:07:42 PM",
          "updateTime": "Jul 10, 2015 4:07:42 PM",
          "createdBy": 10436,
          "updatedBy": 10436,
          "origin_id": [
            "Lausanne",
            "palpitations"
          ],
          "flowType": "NORMAL",
          "destiny_id": [
            "Lausanne",
            "palpitations_details"
          ],
          "others": false,
          "condition": [
            {
              "class": "com.biit.webforms.persistence.entity.condition.TokenComparationAnswer",
              "comparationId": "542b3139-0e02-4fb3-9d97-be7fd5f02074",
              "creationTime": "Jul 10, 2015 4:07:40 PM",
              "updateTime": "Jul 10, 2015 4:13:01 PM",
              "type": "EQ",
              "question_id": [
                "Lausanne",
                "palpitations"
              ],
              "answer_id": [
                "Lausanne",
                "palpitations",
                "yes"
              ]
            }
          ]
        },
        {
          "class": "com.biit.webforms.persistence.entity.Flow",
          "comparationId": "ed204e1a-8a7b-48bb-8712-75c981f4420d",
          "creationTime": "Jul 10, 2015 3:18:14 PM",
          "updateTime": "Jul 10, 2015 3:18:14 PM",
          "createdBy": 10436,
          "updatedBy": 10436,
          "origin_id": [
            "HealthLifestyle",
            "cough_blood_mocus"
          ],
          "flowType": "NORMAL",
          "destiny_id": [
            "HealthLifestyle",
            "glasses_lenses"
          ],
          "others": false,
          "condition": [
            {
              "class": "com.biit.webforms.persistence.entity.condition.TokenComparationAnswer",
              "comparationId": "556142f6-0c60-47d8-8898-999c58a283e4",
              "creationTime": "Jul 10, 2015 3:18:13 PM",
              "updateTime": "Jul 10, 2015 3:22:53 PM",
              "type": "EQ",
              "question_id": [
                "HealthLifestyle",
                "cough_blood_mocus"
              ],
              "answer_id": [
                "HealthLifestyle",
                "cough_blood_mocus",
                "no"
              ]
            }
          ]
        },
        {
          "class": "com.biit.webforms.persistence.entity.Flow",
          "comparationId": "bc99abaa-3e9c-4cc3-8471-dac505fbd804",
          "creationTime": "Jul 10, 2015 1:49:48 PM",
          "updateTime": "Jul 10, 2015 1:49:48 PM",
          "createdBy": 10436,
          "updatedBy": 10436,
          "origin_id": [
            "IllnessInjury",
            "sport_accident"
          ],
          "flowType": "NORMAL",
          "destiny_id": [
            "IllnessInjury",
            "accident"
          ],
          "others": false,
          "condition": [
            {
              "class": "com.biit.webforms.persistence.entity.condition.TokenComparationAnswer",
              "comparationId": "53b9bdd3-1405-47cb-9333-f75662d16bf0",
              "creationTime": "Jul 10, 2015 1:49:47 PM",
              "updateTime": "Jul 10, 2015 1:53:52 PM",
              "type": "EQ",
              "question_id": [
                "IllnessInjury",
                "sport_accident"
              ],
              "answer_id": [
                "IllnessInjury",
                "sport_accident",
                "no"
              ]
            }
          ]
        },
        {
          "class": "com.biit.webforms.persistence.entity.Flow",
          "comparationId": "9a1ce02a-abb2-496a-bdd6-329a6cd64ffb",
          "creationTime": "Jul 10, 2015 1:48:50 PM",
          "updateTime": "Jul 10, 2015 1:48:50 PM",
          "createdBy": 10436,
          "updatedBy": 10436,
          "origin_id": [
            "IllnessInjury",
            "operation"
          ],
          "flowType": "NORMAL",
          "destiny_id": [
            "IllnessInjury",
            "operation_details"
          ],
          "others": false,
          "condition": [
            {
              "class": "com.biit.webforms.persistence.entity.condition.TokenComparationAnswer",
              "comparationId": "5d4f3fd0-ad2b-4792-aac8-de969050dc53",
              "creationTime": "Jul 10, 2015 1:48:49 PM",
              "updateTime": "Jul 10, 2015 1:53:52 PM",
              "type": "EQ",
              "question_id": [
                "IllnessInjury",
                "operation"
              ],
              "answer_id": [
                "IllnessInjury",
                "operation",
                "yes"
              ]
            }
          ]
        },
        {
          "class": "com.biit.webforms.persistence.entity.Flow",
          "comparationId": "59ea06b4-ac18-435f-8966-d4ec56a405f5",
          "creationTime": "Oct 20, 2015 6:01:52 PM",
          "updateTime": "Mar 24, 2016 11:54:56 AM",
          "createdBy": 10436,
          "updatedBy": 10436,
          "origin_id": [
            "Reason",
            "reason"
          ],
          "flowType": "NORMAL",
          "destiny_id": [
            "FamilyHistoryAnamnesis",
            "early_death"
          ],
          "others": false,
          "condition": [
            {
              "class": "com.biit.webforms.persistence.entity.condition.TokenIn",
              "comparationId": "413c532b-6f3e-4bff-a835-43216b5a4e5e",
              "creationTime": "Oct 20, 2015 6:01:50 PM",
              "updateTime": "Jan 3, 2018 2:54:00 PM",
              "type": "IN",
              "question_id": [
                "Reason",
                "reason"
              ],
              "values": [
                {
                  "class": "com.biit.webforms.persistence.entity.condition.TokenInValue",
                  "comparationId": "96a50e52-a411-4753-aa26-9737f177e9a4",
                  "creationTime": "Mar 24, 2016 11:54:56 AM",
                  "updateTime": "Jan 3, 2018 2:54:00 PM",
                  "answer_id": [
                    "Reason",
                    "reason",
                    "veva"
                  ]
                },
                {
                  "class": "com.biit.webforms.persistence.entity.condition.TokenInValue",
                  "comparationId": "a4aaacf5-1cb7-4598-a9f5-e69fd7dd474f",
                  "creationTime": "Mar 24, 2016 11:54:56 AM",
                  "updateTime": "Jan 3, 2018 2:54:00 PM",
                  "answer_id": [
                    "Reason",
                    "reason",
                    "cios"
                  ]
                },
                {
                  "class": "com.biit.webforms.persistence.entity.condition.TokenInValue",
                  "comparationId": "ebace03d-17a3-4f84-8132-ce04ac93fba7",
                  "creationTime": "Mar 24, 2016 11:54:56 AM",
                  "updateTime": "Jan 3, 2018 2:54:00 PM",
                  "answer_id": [
                    "Reason",
                    "reason",
                    "sport"
                  ]
                },
                {
                  "class": "com.biit.webforms.persistence.entity.condition.TokenInValue",
                  "comparationId": "a9c1b00b-cdf1-4e1a-9975-f4a1fec048a4",
                  "creationTime": "Mar 24, 2016 11:54:56 AM",
                  "updateTime": "Jan 3, 2018 2:54:00 PM",
                  "answer_id": [
                    "Reason",
                    "reason",
                    "others"
                  ]
                },
                {
                  "class": "com.biit.webforms.persistence.entity.condition.TokenInValue",
                  "comparationId": "be5bbe31-dab1-46f6-b843-a35bf9888d24",
                  "creationTime": "Mar 24, 2016 11:54:56 AM",
                  "updateTime": "Jan 3, 2018 2:54:00 PM",
                  "answer_id": [
                    "Reason",
                    "reason",
                    "screening_examinations"
                  ]
                }
              ]
            }
          ]
        },
        {
          "class": "com.biit.webforms.persistence.entity.Flow",
          "comparationId": "d6817901-8472-4386-a909-1eef9ca089d2",
          "creationTime": "Jul 10, 2015 4:05:21 PM",
          "updateTime": "Jul 10, 2015 4:05:21 PM",
          "createdBy": 10436,
          "updatedBy": 10436,
          "origin_id": [
            "Lausanne",
            "unconscious"
          ],
          "flowType": "NORMAL",
          "destiny_id": [
            "Lausanne",
            "unconscious_details"
          ],
          "others": false,
          "condition": [
            {
              "class": "com.biit.webforms.persistence.entity.condition.TokenComparationAnswer",
              "comparationId": "0ffca329-36fd-4159-86ae-5fece4d911a4",
              "creationTime": "Jul 10, 2015 4:05:19 PM",
              "updateTime": "Jul 10, 2015 4:06:50 PM",
              "type": "EQ",
              "question_id": [
                "Lausanne",
                "unconscious"
              ],
              "answer_id": [
                "Lausanne",
                "unconscious",
                "yes"
              ]
            }
          ]
        },
        {
          "class": "com.biit.webforms.persistence.entity.Flow",
          "comparationId": "5be69a23-843a-42ac-9db8-9ced2758fafb",
          "creationTime": "Mar 22, 2016 12:21:57 PM",
          "updateTime": "Mar 24, 2016 11:36:03 AM",
          "createdBy": 10436,
          "updatedBy": 10436,
          "origin_id": [
            "Appointment",
            "info_appointment"
          ],
          "flowType": "NORMAL",
          "destiny_id": [
            "Appointment",
            "info_examination_veva"
          ],
          "others": false,
          "condition": [
            {
              "class": "com.biit.webforms.persistence.entity.condition.TokenComparationAnswer",
              "comparationId": "eac36dbc-5529-4188-9516-0184ea777bb3",
              "creationTime": "Mar 22, 2016 12:21:42 PM",
              "updateTime": "Jan 3, 2018 2:54:00 PM",
              "type": "EQ",
              "question_id": [
                "Reason",
                "reason"
              ],
              "answer_id": [
                "Reason",
                "reason",
                "veva"
              ]
            }
          ]
        },
        {
          "class": "com.biit.webforms.persistence.entity.Flow",
          "comparationId": "a5a7f8ba-82f9-41af-9d0f-61903e6a17c4",
          "creationTime": "Mar 22, 2016 12:22:34 PM",
          "updateTime": "Mar 22, 2016 12:22:34 PM",
          "createdBy": 10436,
          "updatedBy": 10436,
          "origin_id": [
            "Appointment",
            "info_examination_cios"
          ],
          "flowType": "NORMAL",
          "destiny_id": [
            "Appointment",
            "info_end"
          ],
          "others": false,
          "condition": []
        },
        {
          "class": "com.biit.webforms.persistence.entity.Flow",
          "comparationId": "4a492c02-dd98-48f8-b5d7-1398594a45bb",
          "creationTime": "Jul 10, 2015 3:19:16 PM",
          "updateTime": "Jul 10, 2015 3:19:16 PM",
          "createdBy": 10436,
          "updatedBy": 10436,
          "origin_id": [
            "HealthLifestyle",
            "hearing_problems"
          ],
          "flowType": "NORMAL",
          "destiny_id": [
            "HealthLifestyle",
            "urination_problems"
          ],
          "others": false,
          "condition": [
            {
              "class": "com.biit.webforms.persistence.entity.condition.TokenComparationAnswer",
              "comparationId": "29188be9-068e-4925-9e68-8359b058908e",
              "creationTime": "Jul 10, 2015 3:19:16 PM",
              "updateTime": "Jul 10, 2015 3:22:53 PM",
              "type": "EQ",
              "question_id": [
                "HealthLifestyle",
                "hearing_problems"
              ],
              "answer_id": [
                "HealthLifestyle",
                "hearing_problems",
                "no"
              ]
            }
          ]
        },
        {
          "class": "com.biit.webforms.persistence.entity.Flow",
          "comparationId": "02e0824d-ba65-4417-a859-32201249148b",
          "creationTime": "Jul 10, 2015 1:53:33 PM",
          "updateTime": "Jul 10, 2015 1:53:33 PM",
          "createdBy": 10436,
          "updatedBy": 10436,
          "origin_id": [
            "IllnessInjury",
            "injured"
          ],
          "flowType": "NORMAL",
          "destiny_id": [
            "IllnessInjury",
            "injured_details"
          ],
          "others": false,
          "condition": [
            {
              "class": "com.biit.webforms.persistence.entity.condition.TokenComparationAnswer",
              "comparationId": "5223a3aa-0cc3-476b-a8bf-a815fa23987d",
              "creationTime": "Jul 10, 2015 1:53:32 PM",
              "updateTime": "Jul 10, 2015 1:53:52 PM",
              "type": "EQ",
              "question_id": [
                "IllnessInjury",
                "injured"
              ],
              "answer_id": [
                "IllnessInjury",
                "injured",
                "yes"
              ]
            }
          ]
        },
        {
          "class": "com.biit.webforms.persistence.entity.Flow",
          "comparationId": "b99bc6a0-7864-420e-a8bf-88843ca5f495",
          "creationTime": "Jul 10, 2015 4:15:20 PM",
          "updateTime": "Jul 10, 2015 4:15:20 PM",
          "createdBy": 10436,
          "updatedBy": 10436,
          "origin_id": [
            "FamilyHistoryAnamnesis",
            "fainting"
          ],
          "flowType": "NORMAL",
          "destiny_id": [
            "FamilyHistoryAnamnesis",
            "absences"
          ],
          "others": false,
          "condition": [
            {
              "class": "com.biit.webforms.persistence.entity.condition.TokenComparationAnswer",
              "comparationId": "25a49a30-40e3-473b-b965-4c2124d83ecb",
              "creationTime": "Jul 10, 2015 4:15:19 PM",
              "updateTime": "Jul 10, 2015 4:19:26 PM",
              "type": "EQ",
              "question_id": [
                "FamilyHistoryAnamnesis",
                "fainting"
              ],
              "answer_id": [
                "FamilyHistoryAnamnesis",
                "fainting",
                "no"
              ]
            }
          ]
        },
        {
          "class": "com.biit.webforms.persistence.entity.Flow",
          "comparationId": "21f508e1-9f27-48c6-be75-643468640f61",
          "creationTime": "Jul 10, 2015 3:20:20 PM",
          "updateTime": "Jul 10, 2015 3:20:20 PM",
          "createdBy": 10436,
          "updatedBy": 10436,
          "origin_id": [
            "HealthLifestyle",
            "digestive_problems"
          ],
          "flowType": "NORMAL",
          "destiny_id": [
            "HealthLifestyle",
            "medication"
          ],
          "others": false,
          "condition": [
            {
              "class": "com.biit.webforms.persistence.entity.condition.TokenComparationAnswer",
              "comparationId": "3a5244b1-10ce-4e70-8f1e-6ea3955c6732",
              "creationTime": "Jul 10, 2015 3:20:19 PM",
              "updateTime": "Jul 10, 2015 3:22:53 PM",
              "type": "EQ",
              "question_id": [
                "HealthLifestyle",
                "digestive_problems"
              ],
              "answer_id": [
                "HealthLifestyle",
                "digestive_problems",
                "no"
              ]
            }
          ]
        },
        {
          "class": "com.biit.webforms.persistence.entity.Flow",
          "comparationId": "ba6646d9-d8b7-4b4a-9c85-891283064ea9",
          "creationTime": "Jul 10, 2015 4:11:16 PM",
          "updateTime": "Jul 10, 2015 4:11:16 PM",
          "createdBy": 10436,
          "updatedBy": 10436,
          "origin_id": [
            "Lausanne",
            "virusinfection"
          ],
          "flowType": "NORMAL",
          "destiny_id": [
            "Lausanne",
            "virusinfection_details"
          ],
          "others": false,
          "condition": [
            {
              "class": "com.biit.webforms.persistence.entity.condition.TokenComparationAnswer",
              "comparationId": "f4e3c427-3c2c-4944-b531-6c7d8b52aa4a",
              "creationTime": "Jul 10, 2015 4:11:15 PM",
              "updateTime": "Jul 10, 2015 4:13:01 PM",
              "type": "EQ",
              "question_id": [
                "Lausanne",
                "virusinfection"
              ],
              "answer_id": [
                "Lausanne",
                "virusinfection",
                "yes"
              ]
            }
          ]
        },
        {
          "class": "com.biit.webforms.persistence.entity.Flow",
          "comparationId": "d43c0377-42f8-4ed0-9deb-a45d3fe4b4c9",
          "creationTime": "Jul 10, 2015 4:17:09 PM",
          "updateTime": "Jul 10, 2015 4:17:09 PM",
          "createdBy": 10436,
          "updatedBy": 10436,
          "origin_id": [
            "FamilyHistoryAnamnesis",
            "heart_transplant"
          ],
          "flowType": "NORMAL",
          "destiny_id": [
            "FamilyHistoryAnamnesis",
            "heart_transplant_details"
          ],
          "others": false,
          "condition": [
            {
              "class": "com.biit.webforms.persistence.entity.condition.TokenComparationAnswer",
              "comparationId": "a5a4fff4-3922-48a9-ab7d-272cc67ea13f",
              "creationTime": "Jul 10, 2015 4:17:07 PM",
              "updateTime": "Jul 10, 2015 4:19:26 PM",
              "type": "EQ",
              "question_id": [
                "FamilyHistoryAnamnesis",
                "heart_transplant"
              ],
              "answer_id": [
                "FamilyHistoryAnamnesis",
                "heart_transplant",
                "yes"
              ]
            }
          ]
        },
        {
          "class": "com.biit.webforms.persistence.entity.Flow",
          "comparationId": "6a6a624c-6b08-4e61-93fd-6faf6901d5bc",
          "creationTime": "Jul 10, 2015 3:19:45 PM",
          "updateTime": "Jul 10, 2015 3:19:45 PM",
          "createdBy": 10436,
          "updatedBy": 10436,
          "origin_id": [
            "HealthLifestyle",
            "urination_problems"
          ],
          "flowType": "NORMAL",
          "destiny_id": [
            "HealthLifestyle",
            "digestive_problems"
          ],
          "others": false,
          "condition": [
            {
              "class": "com.biit.webforms.persistence.entity.condition.TokenComparationAnswer",
              "comparationId": "e0eff7c0-6eae-4052-833a-4c2b617b2dfc",
              "creationTime": "Jul 10, 2015 3:19:45 PM",
              "updateTime": "Jul 10, 2015 3:22:53 PM",
              "type": "EQ",
              "question_id": [
                "HealthLifestyle",
                "urination_problems"
              ],
              "answer_id": [
                "HealthLifestyle",
                "urination_problems",
                "no"
              ]
            }
          ]
        },
        {
          "class": "com.biit.webforms.persistence.entity.Flow",
          "comparationId": "65b8b7ae-bb7a-4b83-987c-7e6d62937d5b",
          "creationTime": "Jul 10, 2015 4:12:15 PM",
          "updateTime": "Jul 10, 2015 4:12:15 PM",
          "createdBy": 10436,
          "updatedBy": 10436,
          "origin_id": [
            "Lausanne",
            "high_blood_pressure"
          ],
          "flowType": "NORMAL",
          "destiny_id": [
            "Lausanne",
            "high_blood_pressure_details"
          ],
          "others": false,
          "condition": [
            {
              "class": "com.biit.webforms.persistence.entity.condition.TokenComparationAnswer",
              "comparationId": "9f440b57-24ea-4af2-86ac-5a21ee164862",
              "creationTime": "Jul 10, 2015 4:12:14 PM",
              "updateTime": "Jul 10, 2015 4:13:01 PM",
              "type": "EQ",
              "question_id": [
                "Lausanne",
                "high_blood_pressure"
              ],
              "answer_id": [
                "Lausanne",
                "high_blood_pressure",
                "yes"
              ]
            }
          ]
        },
        {
          "class": "com.biit.webforms.persistence.entity.Flow",
          "comparationId": "0d9564c1-2d35-4c22-8ea8-d8bdda7ebaec",
          "creationTime": "Jul 10, 2015 1:52:03 PM",
          "updateTime": "Jul 10, 2015 1:52:03 PM",
          "createdBy": 10436,
          "updatedBy": 10436,
          "origin_id": [
            "IllnessInjury",
            "rejected"
          ],
          "flowType": "NORMAL",
          "destiny_id": [
            "IllnessInjury",
            "flu"
          ],
          "others": false,
          "condition": [
            {
              "class": "com.biit.webforms.persistence.entity.condition.TokenComparationAnswer",
              "comparationId": "08b63ac1-16a0-4f1a-b207-acb232712181",
              "creationTime": "Jul 10, 2015 1:52:02 PM",
              "updateTime": "Jul 10, 2015 1:53:52 PM",
              "type": "EQ",
              "question_id": [
                "IllnessInjury",
                "rejected"
              ],
              "answer_id": [
                "IllnessInjury",
                "rejected",
                "no"
              ]
            }
          ]
        },
        {
          "class": "com.biit.webforms.persistence.entity.Flow",
          "comparationId": "ffd9ffb5-d91c-4574-9450-6b1c21ee8d92",
          "creationTime": "Jul 10, 2015 4:10:21 PM",
          "updateTime": "Jul 10, 2015 4:10:21 PM",
          "createdBy": 10436,
          "updatedBy": 10436,
          "origin_id": [
            "Lausanne",
            "dyspnoea"
          ],
          "flowType": "NORMAL",
          "destiny_id": [
            "Lausanne",
            "dyspnoea_details"
          ],
          "others": false,
          "condition": [
            {
              "class": "com.biit.webforms.persistence.entity.condition.TokenComparationAnswer",
              "comparationId": "a3797bb1-88d3-488c-bff9-e5fe3c42bf56",
              "creationTime": "Jul 10, 2015 4:10:20 PM",
              "updateTime": "Jul 10, 2015 4:13:01 PM",
              "type": "EQ",
              "question_id": [
                "Lausanne",
                "dyspnoea"
              ],
              "answer_id": [
                "Lausanne",
                "dyspnoea",
                "yes"
              ]
            }
          ]
        },
        {
          "class": "com.biit.webforms.persistence.entity.Flow",
          "comparationId": "d4b924aa-22ad-4acd-9ce1-70bc80b44675",
          "creationTime": "Jul 10, 2015 1:47:48 PM",
          "updateTime": "Jul 10, 2015 1:47:48 PM",
          "createdBy": 10436,
          "updatedBy": 10436,
          "origin_id": [
            "IllnessInjury",
            "joint_injury"
          ],
          "flowType": "NORMAL",
          "destiny_id": [
            "IllnessInjury",
            "muscle_injury"
          ],
          "others": false,
          "condition": [
            {
              "class": "com.biit.webforms.persistence.entity.condition.TokenComparationAnswer",
              "comparationId": "d855d4e6-d7a1-4e1d-a133-c69b56034971",
              "creationTime": "Jul 10, 2015 1:47:47 PM",
              "updateTime": "Jul 10, 2015 1:53:52 PM",
              "type": "EQ",
              "question_id": [
                "IllnessInjury",
                "joint_injury"
              ],
              "answer_id": [
                "IllnessInjury",
                "joint_injury",
                "no"
              ]
            }
          ]
        },
        {
          "class": "com.biit.webforms.persistence.entity.Flow",
          "comparationId": "44b558fa-cfd9-42c7-9e51-03afee23ce42",
          "creationTime": "Jul 10, 2015 3:21:56 PM",
          "updateTime": "Jul 10, 2015 3:21:56 PM",
          "createdBy": 10436,
          "updatedBy": 10436,
          "origin_id": [
            "HealthLifestyle",
            "smoke"
          ],
          "flowType": "NORMAL",
          "destiny_id": [
            "HealthLifestyle",
            "smoke_details"
          ],
          "others": false,
          "condition": [
            {
              "class": "com.biit.webforms.persistence.entity.condition.TokenComparationAnswer",
              "comparationId": "005ef0f9-6b6c-4edd-a665-5aa2ae6d0c67",
              "creationTime": "Jul 10, 2015 3:21:55 PM",
              "updateTime": "Jul 10, 2015 3:22:53 PM",
              "type": "EQ",
              "question_id": [
                "HealthLifestyle",
                "smoke"
              ],
              "answer_id": [
                "HealthLifestyle",
                "smoke",
                "yes"
              ]
            }
          ]
        },
        {
          "class": "com.biit.webforms.persistence.entity.Flow",
          "comparationId": "390db0af-e4a2-4235-ba8d-a317ee907220",
          "creationTime": "Jul 10, 2015 4:14:49 PM",
          "updateTime": "Jul 10, 2015 4:14:49 PM",
          "createdBy": 10436,
          "updatedBy": 10436,
          "origin_id": [
            "FamilyHistoryAnamnesis",
            "early_death"
          ],
          "flowType": "NORMAL",
          "destiny_id": [
            "FamilyHistoryAnamnesis",
            "fainting"
          ],
          "others": false,
          "condition": [
            {
              "class": "com.biit.webforms.persistence.entity.condition.TokenComparationAnswer",
              "comparationId": "a438013a-4dcc-4576-9d56-a1ad05921660",
              "creationTime": "Jul 10, 2015 4:14:48 PM",
              "updateTime": "Jul 10, 2015 4:19:26 PM",
              "type": "EQ",
              "question_id": [
                "FamilyHistoryAnamnesis",
                "early_death"
              ],
              "answer_id": [
                "FamilyHistoryAnamnesis",
                "early_death",
                "no"
              ]
            }
          ]
        },
        {
          "class": "com.biit.webforms.persistence.entity.Flow",
          "comparationId": "54cdbbe6-b23f-4be3-abde-2d5fdbfe2a69",
          "creationTime": "Oct 20, 2015 5:58:43 PM",
          "updateTime": "Mar 24, 2016 11:54:48 AM",
          "createdBy": 10436,
          "updatedBy": 10436,
          "origin_id": [
            "Reason",
            "reason"
          ],
          "flowType": "NORMAL",
          "destiny_id": [
            "HealthLifestyle",
            "health_issues"
          ],
          "others": false,
          "condition": [
            {
              "class": "com.biit.webforms.persistence.entity.condition.TokenIn",
              "comparationId": "9da40e0a-73e2-48e0-8d73-ac7284b21365",
              "creationTime": "Oct 20, 2015 5:58:42 PM",
              "updateTime": "Jan 3, 2018 2:54:00 PM",
              "type": "IN",
              "question_id": [
                "Reason",
                "reason"
              ],
              "values": [
                {
                  "class": "com.biit.webforms.persistence.entity.condition.TokenInValue",
                  "comparationId": "fe784844-9feb-48bf-b501-266c482adeb2",
                  "creationTime": "Mar 24, 2016 11:54:48 AM",
                  "updateTime": "Jan 3, 2018 2:54:00 PM",
                  "answer_id": [
                    "Reason",
                    "reason",
                    "others"
                  ]
                },
                {
                  "class": "com.biit.webforms.persistence.entity.condition.TokenInValue",
                  "comparationId": "19a14186-bf0c-42c3-8abe-748c01d15c75",
                  "creationTime": "Mar 24, 2016 11:54:48 AM",
                  "updateTime": "Jan 3, 2018 2:54:00 PM",
                  "answer_id": [
                    "Reason",
                    "reason",
                    "cios"
                  ]
                },
                {
                  "class": "com.biit.webforms.persistence.entity.condition.TokenInValue",
                  "comparationId": "91e5fb91-c4c5-4f8e-95d3-1003f6b2865a",
                  "creationTime": "Mar 24, 2016 11:54:48 AM",
                  "updateTime": "Jan 3, 2018 2:54:00 PM",
                  "answer_id": [
                    "Reason",
                    "reason",
                    "veva"
                  ]
                },
                {
                  "class": "com.biit.webforms.persistence.entity.condition.TokenInValue",
                  "comparationId": "6570415a-8f08-4a2c-9edc-4ce3f8485957",
                  "creationTime": "Mar 24, 2016 11:54:48 AM",
                  "updateTime": "Jan 3, 2018 2:54:00 PM",
                  "answer_id": [
                    "Reason",
                    "reason",
                    "sport"
                  ]
                },
                {
                  "class": "com.biit.webforms.persistence.entity.condition.TokenInValue",
                  "comparationId": "a3923622-fece-4acd-8196-ab00f7a8662a",
                  "creationTime": "Mar 24, 2016 11:54:48 AM",
                  "updateTime": "Jan 3, 2018 2:54:00 PM",
                  "answer_id": [
                    "Reason",
                    "reason",
                    "screening_examinations"
                  ]
                }
              ]
            }
          ]
        },
        {
          "class": "com.biit.webforms.persistence.entity.Flow",
          "comparationId": "f66a3ca2-2b1a-4594-868a-073e1b9b8d72",
          "creationTime": "Jul 10, 2015 4:18:21 PM",
          "updateTime": "Jul 10, 2015 4:18:21 PM",
          "createdBy": 10436,
          "updatedBy": 10436,
          "origin_id": [
            "FamilyHistoryAnamnesis",
            "pacemaker"
          ],
          "flowType": "NORMAL",
          "destiny_id": [
            "FamilyHistoryAnamnesis",
            "arrhythmia"
          ],
          "others": false,
          "condition": [
            {
              "class": "com.biit.webforms.persistence.entity.condition.TokenComparationAnswer",
              "comparationId": "502e37fb-46bd-4bb0-a1bb-e5d7eb46f1df",
              "creationTime": "Jul 10, 2015 4:18:20 PM",
              "updateTime": "Jul 10, 2015 4:19:26 PM",
              "type": "EQ",
              "question_id": [
                "FamilyHistoryAnamnesis",
                "pacemaker"
              ],
              "answer_id": [
                "FamilyHistoryAnamnesis",
                "pacemaker",
                "no"
              ]
            }
          ]
        },
        {
          "class": "com.biit.webforms.persistence.entity.Flow",
          "comparationId": "2efc0004-fef2-41e8-9afa-96feee2e96ef",
          "creationTime": "Jul 10, 2015 4:05:34 PM",
          "updateTime": "Jul 10, 2015 4:05:34 PM",
          "createdBy": 10436,
          "updatedBy": 10436,
          "origin_id": [
            "Lausanne",
            "unconscious"
          ],
          "flowType": "NORMAL",
          "destiny_id": [
            "Lausanne",
            "dizziness"
          ],
          "others": false,
          "condition": [
            {
              "class": "com.biit.webforms.persistence.entity.condition.TokenComparationAnswer",
              "comparationId": "7a648635-e519-400d-8cba-e1ab06a72856",
              "creationTime": "Jul 10, 2015 4:05:34 PM",
              "updateTime": "Jul 10, 2015 4:06:50 PM",
              "type": "EQ",
              "question_id": [
                "Lausanne",
                "unconscious"
              ],
              "answer_id": [
                "Lausanne",
                "unconscious",
                "no"
              ]
            }
          ]
        },
        {
          "class": "com.biit.webforms.persistence.entity.Flow",
          "comparationId": "69738cef-a900-4888-9673-9b5ca56c9dcb",
          "creationTime": "Jul 10, 2015 3:20:04 PM",
          "updateTime": "Jul 10, 2015 3:20:04 PM",
          "createdBy": 10436,
          "updatedBy": 10436,
          "origin_id": [
            "HealthLifestyle",
            "digestive_problems"
          ],
          "flowType": "NORMAL",
          "destiny_id": [
            "HealthLifestyle",
            "digestive_problems_details"
          ],
          "others": false,
          "condition": [
            {
              "class": "com.biit.webforms.persistence.entity.condition.TokenComparationAnswer",
              "comparationId": "0af2ac80-7863-4c66-930c-791582111292",
              "creationTime": "Jul 10, 2015 3:20:03 PM",
              "updateTime": "Jul 10, 2015 3:22:53 PM",
              "type": "EQ",
              "question_id": [
                "HealthLifestyle",
                "digestive_problems"
              ],
              "answer_id": [
                "HealthLifestyle",
                "digestive_problems",
                "yes"
              ]
            }
          ]
        },
        {
          "class": "com.biit.webforms.persistence.entity.Flow",
          "comparationId": "6ca50a20-84fe-4f93-9eab-ffb0cddffc3a",
          "creationTime": "Jul 10, 2015 4:17:22 PM",
          "updateTime": "Jul 10, 2015 4:17:22 PM",
          "createdBy": 10436,
          "updatedBy": 10436,
          "origin_id": [
            "FamilyHistoryAnamnesis",
            "heart_transplant"
          ],
          "flowType": "NORMAL",
          "destiny_id": [
            "FamilyHistoryAnamnesis",
            "heart_surgery"
          ],
          "others": false,
          "condition": [
            {
              "class": "com.biit.webforms.persistence.entity.condition.TokenComparationAnswer",
              "comparationId": "c8e0ff96-5901-4f18-84aa-1938263ae1d4",
              "creationTime": "Jul 10, 2015 4:17:21 PM",
              "updateTime": "Jul 10, 2015 4:19:26 PM",
              "type": "EQ",
              "question_id": [
                "FamilyHistoryAnamnesis",
                "heart_transplant"
              ],
              "answer_id": [
                "FamilyHistoryAnamnesis",
                "heart_transplant",
                "no"
              ]
            }
          ]
        },
        {
          "class": "com.biit.webforms.persistence.entity.Flow",
          "comparationId": "49255582-984e-4971-bc63-983901f82858",
          "creationTime": "Jul 10, 2015 4:15:06 PM",
          "updateTime": "Jul 10, 2015 4:15:06 PM",
          "createdBy": 10436,
          "updatedBy": 10436,
          "origin_id": [
            "FamilyHistoryAnamnesis",
            "fainting"
          ],
          "flowType": "NORMAL",
          "destiny_id": [
            "FamilyHistoryAnamnesis",
            "fainting_details"
          ],
          "others": false,
          "condition": [
            {
              "class": "com.biit.webforms.persistence.entity.condition.TokenComparationAnswer",
              "comparationId": "fe6a7ad6-f7f2-4007-ac13-c18ab44195dc",
              "creationTime": "Jul 10, 2015 4:15:04 PM",
              "updateTime": "Jul 10, 2015 4:19:26 PM",
              "type": "EQ",
              "question_id": [
                "FamilyHistoryAnamnesis",
                "fainting"
              ],
              "answer_id": [
                "FamilyHistoryAnamnesis",
                "fainting",
                "yes"
              ]
            }
          ]
        },
        {
          "class": "com.biit.webforms.persistence.entity.Flow",
          "comparationId": "150ffe56-aa86-40b6-810d-b10bab7d717b",
          "creationTime": "Jul 10, 2015 4:06:22 PM",
          "updateTime": "Jul 10, 2015 4:06:22 PM",
          "createdBy": 10436,
          "updatedBy": 10436,
          "origin_id": [
            "Lausanne",
            "epilepsy"
          ],
          "flowType": "NORMAL",
          "destiny_id": [
            "Lausanne",
            "epilepsy_details"
          ],
          "others": false,
          "condition": [
            {
              "class": "com.biit.webforms.persistence.entity.condition.TokenComparationAnswer",
              "comparationId": "9c913e78-9a1e-4e22-afb9-d12c5d815f49",
              "creationTime": "Jul 10, 2015 4:06:21 PM",
              "updateTime": "Jul 10, 2015 4:06:50 PM",
              "type": "EQ",
              "question_id": [
                "Lausanne",
                "epilepsy"
              ],
              "answer_id": [
                "Lausanne",
                "epilepsy",
                "yes"
              ]
            }
          ]
        },
        {
          "class": "com.biit.webforms.persistence.entity.Flow",
          "comparationId": "aad1e9cd-04f7-477c-9eb5-df3e0f2fba73",
          "creationTime": "Jul 10, 2015 4:12:59 PM",
          "updateTime": "Oct 20, 2015 2:56:00 PM",
          "createdBy": 10436,
          "updatedBy": 10436,
          "origin_id": [
            "Lausanne",
            "high_cholesterol"
          ],
          "flowType": "NORMAL",
          "destiny_id": [
            "Lausanne",
            "EndLausanne"
          ],
          "others": false,
          "condition": [
            {
              "class": "com.biit.webforms.persistence.entity.condition.TokenComparationAnswer",
              "comparationId": "1e1783dd-6f2e-4679-9356-b827629a1c55",
              "creationTime": "Jul 10, 2015 4:12:58 PM",
              "updateTime": "Jul 10, 2015 4:13:01 PM",
              "type": "EQ",
              "question_id": [
                "Lausanne",
                "high_cholesterol"
              ],
              "answer_id": [
                "Lausanne",
                "high_cholesterol",
                "no"
              ]
            }
          ]
        },
        {
          "class": "com.biit.webforms.persistence.entity.Flow",
          "comparationId": "bd1e83fe-0336-4bea-941a-39f59259fc2c",
          "creationTime": "Jul 10, 2015 4:20:43 PM",
          "updateTime": "Jul 10, 2015 4:20:43 PM",
          "createdBy": 10436,
          "updatedBy": 10436,
          "origin_id": [
            "FamilyHistoryAnamnesis",
            "diabetes"
          ],
          "flowType": "NORMAL",
          "destiny_id": [
            "FamilyHistoryAnamnesis",
            "marfan_syndrome"
          ],
          "others": false,
          "condition": [
            {
              "class": "com.biit.webforms.persistence.entity.condition.TokenComparationAnswer",
              "comparationId": "0ebeccde-1a57-4f5c-a6d9-0f5de71e0f93",
              "creationTime": "Jul 10, 2015 4:20:42 PM",
              "updateTime": "Jul 10, 2015 4:21:15 PM",
              "type": "EQ",
              "question_id": [
                "FamilyHistoryAnamnesis",
                "diabetes"
              ],
              "answer_id": [
                "FamilyHistoryAnamnesis",
                "diabetes",
                "no"
              ]
            }
          ]
        },
        {
          "class": "com.biit.webforms.persistence.entity.Flow",
          "comparationId": "a35b85ca-8f72-40a9-b8ae-4d7eaf266b50",
          "creationTime": "Jul 9, 2015 5:48:44 PM",
          "updateTime": "Oct 7, 2015 11:31:20 AM",
          "createdBy": 10436,
          "updatedBy": 10436,
          "origin_id": [
            "Appointment",
            "info_examination_basic"
          ],
          "flowType": "NORMAL",
          "destiny_id": [
            "Appointment",
            "info_end"
          ],
          "others": false,
          "condition": []
        },
        {
          "class": "com.biit.webforms.persistence.entity.Flow",
          "comparationId": "394d36a1-6d63-439c-9b19-6e69dc8418f8",
          "creationTime": "Jul 10, 2015 3:16:30 PM",
          "updateTime": "Jul 10, 2015 3:16:30 PM",
          "createdBy": 10436,
          "updatedBy": 10436,
          "origin_id": [
            "HealthLifestyle",
            "often_tired"
          ],
          "flowType": "NORMAL",
          "destiny_id": [
            "HealthLifestyle",
            "often_cold"
          ],
          "others": false,
          "condition": [
            {
              "class": "com.biit.webforms.persistence.entity.condition.TokenComparationAnswer",
              "comparationId": "25c998c1-e427-4a30-97c2-08e9a3c6c4d2",
              "creationTime": "Jul 10, 2015 3:16:29 PM",
              "updateTime": "Jul 10, 2015 3:22:53 PM",
              "type": "EQ",
              "question_id": [
                "HealthLifestyle",
                "often_tired"
              ],
              "answer_id": [
                "HealthLifestyle",
                "often_tired",
                "no"
              ]
            }
          ]
        },
        {
          "class": "com.biit.webforms.persistence.entity.Flow",
          "comparationId": "c9fce917-23e0-48db-8056-5bffc8115ff6",
          "creationTime": "Jul 10, 2015 4:17:36 PM",
          "updateTime": "Jul 10, 2015 4:17:36 PM",
          "createdBy": 10436,
          "updatedBy": 10436,
          "origin_id": [
            "FamilyHistoryAnamnesis",
            "heart_surgery"
          ],
          "flowType": "NORMAL",
          "destiny_id": [
            "FamilyHistoryAnamnesis",
            "heart_surgery_details"
          ],
          "others": false,
          "condition": [
            {
              "class": "com.biit.webforms.persistence.entity.condition.TokenComparationAnswer",
              "comparationId": "f237c5d0-6f07-4470-abfa-82cb2f078baf",
              "creationTime": "Jul 10, 2015 4:17:35 PM",
              "updateTime": "Jul 10, 2015 4:19:26 PM",
              "type": "EQ",
              "question_id": [
                "FamilyHistoryAnamnesis",
                "heart_surgery"
              ],
              "answer_id": [
                "FamilyHistoryAnamnesis",
                "heart_surgery",
                "yes"
              ]
            }
          ]
        },
        {
          "class": "com.biit.webforms.persistence.entity.Flow",
          "comparationId": "1d811875-79f1-4bfd-b310-5dd532e96cab",
          "creationTime": "Jun 2, 2015 4:42:08 PM",
          "updateTime": "Jun 2, 2015 4:42:08 PM",
          "createdBy": 10436,
          "updatedBy": 10436,
          "origin_id": [
            "HealthLifestyle",
            "allergic"
          ],
          "flowType": "NORMAL",
          "destiny_id": [
            "HealthLifestyle",
            "allergic_details"
          ],
          "others": false,
          "condition": [
            {
              "class": "com.biit.webforms.persistence.entity.condition.TokenComparationAnswer",
              "comparationId": "bad38f89-c705-4bfc-b371-5ab9cd2f7f8a",
              "creationTime": "Jun 2, 2015 4:42:06 PM",
              "updateTime": "Jun 2, 2015 4:42:16 PM",
              "type": "EQ",
              "question_id": [
                "HealthLifestyle",
                "allergic"
              ],
              "answer_id": [
                "HealthLifestyle",
                "allergic",
                "yes"
              ]
            }
          ]
        },
        {
          "class": "com.biit.webforms.persistence.entity.Flow",
          "comparationId": "880caf23-40c3-42f3-ac51-922d402f5eab",
          "creationTime": "Jul 10, 2015 1:47:30 PM",
          "updateTime": "Jul 10, 2015 1:47:30 PM",
          "createdBy": 10436,
          "updatedBy": 10436,
          "origin_id": [
            "IllnessInjury",
            "joint_injury"
          ],
          "flowType": "NORMAL",
          "destiny_id": [
            "IllnessInjury",
            "joint_injury_details"
          ],
          "others": false,
          "condition": [
            {
              "class": "com.biit.webforms.persistence.entity.condition.TokenComparationAnswer",
              "comparationId": "ea7ae77e-caa8-4439-8f0c-94d17fc74a39",
              "creationTime": "Jul 10, 2015 1:47:26 PM",
              "updateTime": "Jul 10, 2015 1:53:52 PM",
              "type": "EQ",
              "question_id": [
                "IllnessInjury",
                "joint_injury"
              ],
              "answer_id": [
                "IllnessInjury",
                "joint_injury",
                "yes"
              ]
            }
          ]
        },
        {
          "class": "com.biit.webforms.persistence.entity.Flow",
          "comparationId": "d96d77f9-8ff5-4abc-a005-83695858eb4c",
          "creationTime": "Jul 10, 2015 4:14:32 PM",
          "updateTime": "Jul 10, 2015 4:14:32 PM",
          "createdBy": 10436,
          "updatedBy": 10436,
          "origin_id": [
            "FamilyHistoryAnamnesis",
            "early_death"
          ],
          "flowType": "NORMAL",
          "destiny_id": [
            "FamilyHistoryAnamnesis",
            "early_death_details"
          ],
          "others": false,
          "condition": [
            {
              "class": "com.biit.webforms.persistence.entity.condition.TokenComparationAnswer",
              "comparationId": "714a5772-24c4-4c00-b5ae-341cec43f576",
              "creationTime": "Jul 10, 2015 4:14:31 PM",
              "updateTime": "Jul 10, 2015 4:19:26 PM",
              "type": "EQ",
              "question_id": [
                "FamilyHistoryAnamnesis",
                "early_death"
              ],
              "answer_id": [
                "FamilyHistoryAnamnesis",
                "early_death",
                "yes"
              ]
            }
          ]
        },
        {
          "class": "com.biit.webforms.persistence.entity.Flow",
          "comparationId": "30abeb13-cac6-4ded-95be-5faf7dcc15b3",
          "creationTime": "Mar 31, 2015 12:45:04 PM",
          "updateTime": "Mar 24, 2016 11:53:54 AM",
          "createdBy": 10436,
          "updatedBy": 10436,
          "origin_id": [
            "Reason",
            "reason"
          ],
          "flowType": "NORMAL",
          "destiny_id": [
            "PersonalDetails",
            "profile_first_name"
          ],
          "others": false,
          "condition": [
            {
              "class": "com.biit.webforms.persistence.entity.condition.TokenComparationAnswer",
              "comparationId": "4be01ecf-3ae3-4d61-82bb-47232b1f62b3",
              "creationTime": "Mar 31, 2015 12:44:59 PM",
              "updateTime": "Jun 2, 2015 11:08:58 AM",
              "type": "EQ",
              "question_id": [
                "Reason",
                "reason"
              ],
              "answer_id": [
                "Reason",
                "reason",
                "sport"
              ]
            },
            {
              "class": "com.biit.webforms.persistence.entity.condition.Token",
              "comparationId": "8139509c-e29e-4f2c-9772-d05e4c09fb45",
              "creationTime": "Mar 24, 2016 11:53:42 AM",
              "updateTime": "Jan 3, 2018 2:54:00 PM",
              "type": "OR"
            },
            {
              "class": "com.biit.webforms.persistence.entity.condition.TokenComparationAnswer",
              "comparationId": "8c84f401-feba-4e38-86f1-7728962ed112",
              "creationTime": "Mar 24, 2016 11:53:45 AM",
              "updateTime": "Jan 3, 2018 2:54:00 PM",
              "type": "EQ",
              "question_id": [
                "Reason",
                "reason"
              ],
              "answer_id": [
                "Reason",
                "reason",
                "veva"
              ]
            },
            {
              "class": "com.biit.webforms.persistence.entity.condition.Token",
              "comparationId": "db0db351-dd7a-4173-baa3-52d1e8ea1d9e",
              "creationTime": "Mar 24, 2016 11:53:48 AM",
              "updateTime": "Jan 3, 2018 2:54:00 PM",
              "type": "OR"
            },
            {
              "class": "com.biit.webforms.persistence.entity.condition.TokenComparationAnswer",
              "comparationId": "b2b3565d-b261-4000-abf8-96846634158b",
              "creationTime": "Mar 24, 2016 11:53:53 AM",
              "updateTime": "Jan 3, 2018 2:54:00 PM",
              "type": "EQ",
              "question_id": [
                "Reason",
                "reason"
              ],
              "answer_id": [
                "Reason",
                "reason",
                "cios"
              ]
            }
          ]
        },
        {
          "class": "com.biit.webforms.persistence.entity.Flow",
          "comparationId": "ad1d5230-7a73-4d94-9cfd-959dac1844bf",
          "creationTime": "Jul 10, 2015 1:48:08 PM",
          "updateTime": "Jul 10, 2015 1:48:08 PM",
          "createdBy": 10436,
          "updatedBy": 10436,
          "origin_id": [
            "IllnessInjury",
            "muscle_injury"
          ],
          "flowType": "NORMAL",
          "destiny_id": [
            "IllnessInjury",
            "muscle_injury_details"
          ],
          "others": false,
          "condition": [
            {
              "class": "com.biit.webforms.persistence.entity.condition.TokenComparationAnswer",
              "comparationId": "9132bd37-bd7f-4d16-8658-0a3ff6507c0c",
              "creationTime": "Jul 10, 2015 1:48:06 PM",
              "updateTime": "Jul 10, 2015 1:53:52 PM",
              "type": "EQ",
              "question_id": [
                "IllnessInjury",
                "muscle_injury"
              ],
              "answer_id": [
                "IllnessInjury",
                "muscle_injury",
                "yes"
              ]
            }
          ]
        }
      ],
      "webserviceCalls": []
    }
  }
}
