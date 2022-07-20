import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConstantService {

  constructor() { }

  constants = {

		client_front_end_id: "1001",

		employeeStatus: ["Temporary", "Permanent"],

		religion: ["Hinduism", "Islam", "Sikhism", "Christianity", "Buddhism", "Jainism", "Judaism", "Other"],

		gender: ["Male", "Female", "Other"],

		bloodGroupTypes: ["A+", "B+", "O+", "AB+", "A-", "B-", "O-", "AB-"],

		truck_path:"M13.55 0L13.72 0L13.88 0L14.04 0L14.2 0L14.36 0L14.52 0.01L14.69 0.01L14.85 0.01L15.01 0.01L15.17 0.01L15.33 0.01L15.49 0.01L15.65 0.01L15.81 0.01L15.97 0.01L16.13 0.02L16.28 0.02L16.65 0.02L16.98 0.02L17.29 0.02L17.56 0.02L17.81 0.02L18.03 0.03L18.23 0.03L18.41 0.03L18.56 0.04L18.7 0.05L18.81 0.05L18.91 0.06L19 0.07L19.07 0.08L19.13 0.09L19.18 0.1L19.22 0.11L19.25 0.12L19.27 0.13L19.29 0.14L19.31 0.15L19.32 0.17L19.33 0.18L19.35 0.2L19.36 0.21L19.39 0.23L19.41 0.25L19.44 0.27L19.48 0.28L19.53 0.3L19.59 0.32L19.67 0.34L19.76 0.37L19.86 0.39L19.88 0.39L19.91 0.4L19.93 0.4L19.96 0.4L19.99 0.41L20.02 0.41L20.06 0.41L20.09 0.42L20.12 0.42L20.16 0.42L20.2 0.43L20.23 0.43L20.27 0.43L20.31 0.44L20.35 0.44L20.39 0.44L20.43 0.44L20.47 0.45L20.51 0.45L20.55 0.45L20.59 0.45L20.63 0.46L20.75 0.46L20.78 0.46L20.82 0.47L20.86 0.47L20.89 0.47L20.92 0.47L20.95 0.47L20.99 0.48L21.01 0.48L21.04 0.48L21.4 0.52L21.74 0.56L22.06 0.61L22.37 0.66L22.66 0.72L22.93 0.79L23.18 0.86L23.42 0.93L23.65 1.02L23.86 1.11L24.05 1.2L24.23 1.3L24.4 1.41L24.56 1.53L24.7 1.66L24.84 1.79L24.96 1.93L25.07 2.07L25.18 2.23L25.27 2.39L25.36 2.56L25.43 2.74L25.5 2.93L25.56 3.12L25.62 3.33L25.67 3.54L25.71 3.77L25.75 4L25.79 4.24L25.82 4.5L25.84 4.76L25.87 5.03L25.89 5.31L25.91 5.61L25.99 5.66L26.07 5.72L26.15 5.77L26.24 5.83L26.33 5.88L26.42 5.94L26.51 5.99L26.6 6.04L26.7 6.09L26.79 6.14L26.89 6.19L26.99 6.25L27.09 6.3L27.19 6.35L27.4 6.45L27.5 6.51L27.6 6.56L27.71 6.61L27.81 6.67L27.91 6.72L28.02 6.78L28.12 6.84L28.22 6.9L28.33 6.96L28.43 7.02L28.53 7.08L28.63 7.14L28.73 7.21L28.83 7.28L28.93 7.34L29.02 7.42L29.12 7.49L29.21 7.56L29.21 7.6L29.22 7.64L29.22 7.67L29.22 7.71L29.23 7.73L29.23 7.76L29.24 7.79L29.24 7.81L29.25 7.83L29.25 7.85L29.25 7.86L29.25 7.88L29.26 7.89L29.26 7.9L29.26 7.91L29.25 7.92L29.25 7.92L29.25 7.93L29.24 7.93L29.23 7.94L29.22 7.94L29.21 7.94L29.2 7.94L29.18 7.94L29.17 7.94L29.15 7.94L29.12 7.94L29.07 7.94L29.04 7.94L29 7.94L28.97 7.94L28.92 7.94L28.88 7.94L25.99 7.35L25.99 7.58L25.99 7.84L25.99 8.12L26 8.43L26 8.77L26.01 9.13L26.02 9.5L26.03 9.9L26.03 10.31L26.04 10.73L26.05 11.16L26.06 11.61L26.07 12.06L26.08 12.52L26.08 12.98L26.09 13.45L26.09 13.91L26.09 14.37L26.09 14.82L26.09 15.27L26.08 15.72L26.07 16.15L26.06 16.56L26.05 16.97L26.03 17.35L26.01 17.72L25.99 18.07L25.96 18.39L25.93 18.69L25.89 18.96L25.85 19.21L25.8 19.42L25.75 19.6L25.69 19.75L25.5 19.79L25.31 19.82L25.14 19.85L24.98 19.87L24.82 19.89L24.68 19.9L24.54 19.91L24.42 19.91L24.3 19.91L24.19 19.91L24.08 19.91L23.99 19.91L23.9 19.9L23.82 19.89L23.74 19.89L23.67 19.88L23.6 19.88L23.54 19.87L23.49 19.87L23.44 19.87L23.39 19.87L23.35 19.87L23.31 19.88L23.27 19.9L23.24 19.91L23.21 19.94L23.18 19.96L23.16 20L23.13 20.04L23.11 20.09L23.09 20.14L23.07 20.2L23.04 20.27L23.02 20.35L26.02 20.35L26.02 55.72L3.44 55.72L3.44 20.38L6.63 20.38L6.61 20.31L6.6 20.26L6.59 20.2L6.58 20.16L6.57 20.12L6.56 20.08L6.56 20.05L6.55 20.02L6.55 20L6.55 19.96L6.55 19.95L6.55 19.94L6.54 19.93L6.54 19.92L6.54 19.92L6.53 19.92L6.52 19.92L6.51 19.92L6.5 19.92L6.49 19.92L6.47 19.93L6.45 19.93L6.42 19.93L6.39 19.94L6.36 19.94L6.33 19.94L6.28 19.94L6.24 19.94L6.18 19.94L6.13 19.94L6.06 19.93L5.99 19.92L5.92 19.91L5.84 19.9L5.76 19.89L5.67 19.89L5.59 19.89L5.51 19.88L5.42 19.89L5.34 19.89L5.25 19.89L5.16 19.9L5.08 19.9L4.99 19.9L4.9 19.91L4.81 19.91L4.73 19.91L4.64 19.91L4.56 19.9L4.47 19.9L4.39 19.89L4.31 19.88L4.23 19.86L4.15 19.84L4.07 19.82L4 19.79L3.92 19.76L3.85 19.72L3.79 19.67L3.72 19.62L3.66 19.56L3.6 19.49L3.54 19.42L3.49 19.34L3.44 19.25L3.4 19.15L3.36 19.05L3.32 18.92L3.29 18.76L3.27 18.56L3.24 18.33L3.22 18.07L3.2 17.78L3.19 17.46L3.18 17.12L3.17 16.75L3.16 16.37L3.15 15.97L3.15 15.55L3.15 15.12L3.15 14.68L3.16 14.24L3.16 13.78L3.17 13.33L3.17 12.87L3.18 12.42L3.19 11.97L3.2 11.52L3.21 11.08L3.22 10.66L3.23 10.24L3.24 9.85L3.25 9.46L3.26 9.1L3.27 8.77L3.27 8.45L3.28 8.16L3.29 7.91L3.29 7.68L3.3 7.49L3.3 7.33L0.39 7.94L0.35 7.94L0.31 7.94L0.27 7.94L0.24 7.94L0.21 7.94L0.18 7.94L0.15 7.94L0.13 7.95L0.11 7.95L0.09 7.95L0.07 7.95L0.06 7.95L0.05 7.95L0.04 7.95L0.03 7.95L0.02 7.94L0.01 7.94L0.01 7.93L0 7.93L0 7.92L0 7.91L0 7.9L0 7.89L0 7.87L0 7.86L0.01 7.84L0.01 7.8L0.01 7.77L0.02 7.74L0.02 7.71L0.02 7.68L0.03 7.65L0.03 7.61L0.08 7.55L0.14 7.5L0.19 7.44L0.25 7.39L0.31 7.34L0.37 7.28L0.43 7.23L0.49 7.18L0.55 7.14L0.61 7.09L0.67 7.04L0.74 6.99L0.8 6.95L0.87 6.9L0.94 6.86L1.01 6.81L1.08 6.77L1.15 6.72L1.22 6.68L1.3 6.64L1.37 6.6L1.45 6.55L1.53 6.51L1.61 6.47L1.69 6.43L1.77 6.39L1.85 6.34L1.94 6.3L2.02 6.26L2.11 6.22L2.2 6.18L2.29 6.13L2.38 6.09L2.48 6.05L2.61 5.99L2.72 5.94L2.83 5.88L2.93 5.83L3.03 5.78L3.11 5.74L3.19 5.69L3.26 5.65L3.32 5.6L3.38 5.56L3.43 5.51L3.47 5.47L3.51 5.42L3.55 5.38L3.59 5.33L3.62 5.28L3.64 5.23L3.67 5.18L3.69 5.12L3.71 5.06L3.73 5L3.75 4.94L3.77 4.87L3.79 4.79L3.82 4.72L3.84 4.63L3.86 4.55L3.89 4.45L3.92 4.36L3.95 4.25L3.99 4.14L4.03 4.02L4.08 3.9L4.13 3.77L4.19 3.61L4.25 3.46L4.31 3.3L4.37 3.15L4.43 3L4.49 2.86L4.56 2.71L4.63 2.57L4.7 2.43L4.77 2.3L4.85 2.17L4.93 2.04L5.02 1.91L5.12 1.79L5.22 1.68L5.32 1.56L5.44 1.46L5.56 1.35L5.69 1.26L5.83 1.16L5.98 1.08L6.14 0.99L6.31 0.92L6.49 0.85L6.68 0.78L6.88 0.73L7.1 0.68L7.32 0.63L7.57 0.6L7.82 0.57L8.09 0.55L8.38 0.53L8.68 0.53L9 0.53L10.56 0.43L10.87 0.04L11.02 0.03L11.17 0.03L11.33 0.02L11.48 0.02L11.64 0.01L11.8 0.01L11.95 0.01L12.11 0.01L12.27 0L12.43 0L12.59 0L12.75 0L12.91 0L13.07 0L13.23 0L13.39 0L13.55 0ZM22.55 16.86L22.65 18.04L22.95 18.76L23.68 19.13L25.06 19.23L25.06 16.84L23.99 16.81L23.35 16.81L22.55 16.86ZM4.21 18.96L5.52 18.82L6.26 18.45L6.58 17.74L6.66 16.56L4.21 16.56L4.21 18.96ZM22.49 10.72L22.38 13.22L22.44 16.23L25.09 16.23L25.09 7.89L25.03 6.68L23.22 8.58L22.49 10.72ZM6.71 15.95L6.66 14.38L6.22 12.26L5.37 9.61L4.13 6.42L4.18 15.95L6.71 15.95ZM8.85 4.62L6.65 4.89L5.31 5.26L5.33 5.55L5.41 5.82L5.54 6.09L5.7 6.35L5.89 6.6L6.08 6.85L6.28 7.1L6.47 7.35L6.7 7.71L6.88 8L7.04 8.24L7.22 8.42L7.45 8.54L7.75 8.61L8.16 8.62L8.72 8.56L9.13 8.52L9.55 8.49L10 8.46L10.44 8.44L10.88 8.4L11.3 8.35L11.71 8.27L12.08 8.17L13.09 7.9L14.06 7.78L14.97 7.77L15.81 7.85L16.58 7.98L17.26 8.12L17.85 8.25L18.35 8.33L18.66 8.37L19.06 8.41L19.53 8.47L20.02 8.52L20.5 8.57L20.93 8.62L21.28 8.65L21.51 8.66L21.96 8.52L22.43 8.17L22.9 7.65L23.35 7.05L23.74 6.43L24.06 5.86L24.27 5.4L24.34 5.12L22.9 4.76L20.63 4.51L17.81 4.38L14.71 4.36L11.63 4.44L8.85 4.62ZM22.68 2.62L23.9 3.29L25.06 3.67L24.74 2.54L23.97 1.67L22.83 1.12L21.4 0.97L21.74 1.8L22.68 2.62ZM5.94 1.69L5.14 2.54L4.84 3.65L5.47 3.5L6.04 3.25L6.58 2.94L7.13 2.6L7.6 2.32L8.05 1.95L8.38 1.49L8.5 0.92L7.11 1.15L5.94 1.69Z",

		alertCodes :{
            over_speed: 'Overspeed Alert',
            sos: 'Panic Alert',
            hb: 'Harsh Braking',
            ha: 'Rapid Acceleration',
            fw: 'Free Wheeling',
            nd: 'Night Drive',
            cd: 'Continuous Driving',
            idle:'Excessive Idle',
            tl:'Tilt',
			bettery_reconnect:'Power Connect',
			wire_disconnect: 'Wire Disconnect',
			power_cut: 'Power cut',
			tempering: 'Tempering',
			engine_on:'Engine On',
			engine_off:'Engine off',
			emergency:'Emergency',
			low_internal_battery:'Low Battery',
			rfid:'Driver Tag Swiped',
			rt: 'Harsh Cornering',
			halt: 'Halt Alert',
			anti_theft: 'Anti Theft'
        },
		formula: {
			"Total Payable": "totWithMunshiyana+totalCharges-totalDeduction-tdsAmount-extChargesTdsAmount",
			"Total TDS": "tdsAmount+extChargesTdsAmount",
			"Remaining Amount": "totalPayable-tAdv",
			"Total With Munshiyana": "munshiyana+total_expense"
		},

		client_allowed: [
			{
				"clientId": "10808",
				"name": "DGFC FCM",
				"state_code": "06"
			},
			{
				"clientId": "11009",
				"name": "DGFC RCM",
				"state_code": "07"
			},
			{
				"clientId": "11108",
				"name": "DG Freight Corp",
				"state_code": "06"
			},
			{
				"clientId": "10909",
				"name": "DAPL",
				"state_code": "06"
			}
		],

		aCreditNoteTemplate: [
			{
				name: 'CREDIT NOTE',
				key: "CARV_CREDIT_NOTE_Print_format"
			},
			// {
			// 	name: 'CREDIT NOTE',
			// 	key: "CREDIT_NOTE_Print_format"
			// }, {
			// 	name: 'CREDIT NOTE 2',
			// 	key: "Credit_note2_format"
			// }, {
			// 	name: 'Usha Credit Note',
			// 	key: "DGD_Usha_Credit_Note"
			// },
		],

		aDebitNoteTemplate: [
			{
				name: 'DEBIT NOTE',
				key: "MMP_DEBIT_NOTE_Print_format"
			}
		],

		aPurchaseBillTemplate: [
			{
				name: 'PURCHASE BILL',
				key: "DGFC_PurchaseBillPreview"
			}],

		user_type: ["Driver", "Supervisor", "Trip Manager", "Mechanic", "Marketing Manager", "Employee", "POapprover",
			"PRapprover", "QuotApprover", "SOApprover", "InvoiceApprover", "Dealer", "Customer", "Branch Admin", "Transporter", "Broker", 'SalesExecutive', 'Loading Babu'],

		maritalStatusTypes: ["Married", "Single", "Widow", "Widower"],

		educationTypes: ["Primary", "Secondary", "Senior secondary", "Graduate", "Post graduate", "Diploma", "Doctorate"],

		branchTypes: ["Headquarters", "Regional Head Office", "State Head Office", "Inland Office", "Overseas Office"],

		routeTypes: ["One way", "Two way"],

		aReport: ['DLP', 'DUP', 'RTP', 'RTP Expense', 'Detail RTP'],

    aCategoryforVehicle : ['Horse', 'Truck', 'Trailer'],

		aSettlementReport: ['RT Settled Report'],

		aReportType: ['Bill Report', 'Bill Ledger Transaction Report', 'OutStanding Report (Customer)', 'OutStanding Monthly Report', 'Billing Party Monthly Report', 'Billingparty Group Report', 'Advance Date wise count report', 'Advance Date wise amount report', 'MR Deduction Report', 'CN Deduction Report', 'MR And CN Deduction Report', 'Monthly Deduction', 'GST Sales'],

		tdsSources: [{
			"section": "193",
			"source": "Interest on Securities"
		}, {
			"section": "194",
			"source": "Dividend"
		}, {
			"section": "194A",
			"source": "Interest other than interest on securities"
		}, {
			"section": "194 C",
			"source": "Payments to contractors and sub-contractors"
		}, {
			"section": "194D",
			"source": "Insurance Commission"
		}, {
			"section": "194DA",
			"source": "Payment in respect of life insurance policy"
		}, {
			"section": "194EE",
			"source": "Payments in respect of deposits under National Savings Scheme"
		}, {
			"section": "194F",
			"source": "Payments on account of re-purchase of Units by Mutual Funds or UTI"
		}, {
			"section": "194 J",
			"source": "Fees for Professional or Technical Services"
		}, {
			"section": "194 J",
			"source": "Tds on Professional Fee(Under sec-206AB/206CCA)"
		},
			{
				"section": "206AB/206CCA",
				"source": "TDS Deduction Under Section Sec- 206AB/206CCA"
			}, {
				"section": "94I",
				"source": "94I - Rent"
			},{
				"section": "6CR",
				"source": "6CR - TCS on sale of Goods"
			},{
				"section": "94Q",
				"source": "94Q - Deduction of tax at source on payment of certain sum for purchase of goods"
			}
		],

		// tdsCategory1: ['Individual', 'HUF', 'Firm','Company Public Interested', 'Company not public interested', 'Company Private'],
		tdsCategory: ['Individuals or HUF', 'Non Individual/corporate'],

		modelConfigs: {
			RATE_CHART: {
				effectiveDate: {
					label: 'EFFECTIVE DATE',
					ourLabel: 'EFFECTIVE DATE',
					type: '__date__',
					visible: true,
					editable: true,
				},
				source: {
					label: 'SOURCE',
					ourLabel: 'SOURCE',
					type: 'text',
					visible: true,
					editable: true,
				},
				destination: {
					label: 'DESTINATION',
					ourLabel: 'DESTINATION',
					type: 'text',
					visible: true,
					editable: true,
				},
				materialGroupCode: {
					label: 'Material Group Code',
					ourLabel: 'Material Group Code',
					type: 'text',
					visible: true,
					editable: true,
				},
				baseRate: [],
				routeDistance: {
					label: 'Route KMs',
					ourLabel: 'Route KMs',
					type: 'number',
					visible: true,
					editable: true,
				},
				paymentBasis: {
					label: 'Payment Basis',
					ourLabel: 'Payment Basis',
					type: 'text',
					enum: ['Fixed', 'PUnit', 'PMT', 'Percentage'],
					visible: true,
					editable: true,
				},
				'baseValueLabel': {
					label: 'Base Value Label',
					ourLabel: 'Base Value Label',
					type: 'text',
					// enum: [40, 65],
					visible: true,
					editable: true,
				},
				'baseValue': {
					label: 'Base Value',
					ourLabel: 'Base Value',
					type: 'number',
					// enum: [40, 65],
					visible: true,
					editable: true,
				},
				rate: {
					label: 'Rate',
					ourLabel: 'Rate',
					type: 'number',
					visible: true,
					editable: true,
				},
				unit: {
					label: 'Unit',
					ourLabel: 'Unit',
					type: 'number',
					visible: true,
					editable: true,
				},
				invoiceRate: {
					label: 'Invoice Rate',
					ourLabel: 'Invoice Rate',
					type: 'number',
					visible: true,
					editable: true,
				},
				insurRate: {
					label: 'Insurance Rate',
					ourLabel: 'Insurance Rate',
					type: 'number',
					visible: true,
					editable: true,
				},
				'grCharges.rate': {
					label: 'GR Charges',
					ourLabel: 'GR Charges',
					type: 'number',
					visible: true,
					editable: true,
				},
				'grCharges.basis': {
					label: 'GR Charges Basis',
					ourLabel: 'GR Charges Basis',
					type: 'text',
					enum: ['Percent of basic freight', 'Fixed'],
					visible: true,
					editable: true,
				},
				'surCharges.rate': {
					label: 'Sur Charges',
					ourLabel: 'Sur Charges',
					type: 'number',
					visible: true,
					editable: true,
				},
				'surCharges.basis': {
					label: 'Sur Charges Basis',
					ourLabel: 'Sur Charges Basis',
					type: 'text',
					enum: ['Fixed'],
					visible: true,
					editable: true,
				},
				'cartageCharges.rate': {
					label: 'Cartage Charges',
					ourLabel: 'Cartage Charges',
					type: 'number',
					visible: true,
					editable: true,
				},
				'cartageCharges.basis': {
					label: 'Cartage Charges Basis',
					ourLabel: 'Cartage Charges Basis',
					type: 'text',
					enum: ['Fixed'],
					visible: true,
					editable: true,
				},
				'labourCharges.rate': {
					label: 'Labour Charges',
					ourLabel: 'Labour Charges',
					type: 'number',
					visible: true,
					editable: true,
				},
				'labourCharges.basis': {
					label: 'Labour Charges Basis',
					ourLabel: 'Labour Charges Basis',
					type: 'text',
					enum: ['Fixed'],
					visible: true,
					editable: true,
				},
				'otherCharges.rate': {
					label: 'Other Charges',
					ourLabel: 'Other Charges',
					type: 'number',
					visible: true,
					editable: true,
				},
				'otherCharges.basis': {
					label: 'Other Charges Basis',
					ourLabel: 'Other Charges Basis',
					type: 'text',
					enum: ['Fixed'],
					visible: true,
					editable: true,
				},
				'prevFreightCharges.rate': {
					label: 'Prev Freight Charges',
					ourLabel: 'Prev Freight Charges',
					type: 'number',
					visible: true,
					editable: true,
				},
				'prevFreightCharges.basis': {
					label: 'Prev Freight Charges Basis',
					ourLabel: 'Prev Freight Charges Basis',
					type: 'text',
					enum: ['Fixed'],
					visible: true,
					editable: true,
				},
				'detentionLoading.rate': {
					label: 'Detention Loading Rate',
					ourLabel: 'Detention Loading Rate',
					type: 'number',
					visible: true,
					editable: true,
				},
				'detentionLoading.basis': {
					label: 'Detention Loading Basis',
					ourLabel: 'Detention Loading Basis',
					type: 'text',
					enum: ['Fixed'],
					visible: true,
					editable: true,
				},
				'detentionUnloading.rate': {
					label: 'Detention Unloading Rate',
					ourLabel: 'Detention Unloading Rate',
					type: 'number',
					visible: true,
					editable: true,
				},
				'detentionUnloading.basis': {
					label: 'Detention Unloading Basis',
					ourLabel: 'Detention Unloading Basis',
					type: 'text',
					enum: ['Fixed'],
					visible: true,
					editable: true,
				},
				'discount.rate': {
					label: 'Discount',
					ourLabel: 'Discount',
					type: 'number',
					visible: true,
					editable: true,
				},
				'discount.basis': {
					label: 'Discount Basis',
					ourLabel: 'Discount Basis',
					type: 'text',
					enum: ['Fixed'],
					visible: true,
					editable: true,
				},
				'loading_charges.rate': {
					label: 'Loading Charges',
					ourLabel: 'Loading Charges',
					type: 'number',
					enum: ['Fixed'],
					visible: true,
					editable: true,
				},
				'loading_charges.basis': {
					label: 'Loading Charges Basis',
					ourLabel: 'Loading Charges Basis',
					type: 'text',
					enum: ['Percent of basic freight', 'Fixed'],
					visible: true,
					editable: true,
				},
				'unloading_charges.rate': {
					label: 'Unloading Charges',
					ourLabel: 'Unloading Charges',
					type: 'number',
					enum: ['Fixed'],
					visible: true,
					editable: true,
				},
				'unloading_charges.basis': {
					label: 'Unloading Charges Basis',
					ourLabel: 'Unloading Charges Basis',
					type: 'text',
					enum: ['Percent of basic freight', 'Fixed'],
					visible: true,
					editable: true,
				},
				'weightman_charges.rate': {
					label: 'WeightMan Charges',
					ourLabel: 'WeightMan Charges',
					type: 'number',
					enum: ['Fixed'],
					visible: true,
					editable: true,
				},
				'weightman_charges.basis': {
					label: 'WeightMan Charges Basis',
					ourLabel: 'WeightMan Charges Basis',
					type: 'text',
					enum: ['Percent of basic freight', 'Fixed'],
					visible: true,
					editable: true,
				},
				'overweight_charges.rate': {
					label: 'OverWeight Charges',
					ourLabel: 'OverWeight Charges',
					type: 'number',
					enum: ['Fixed'],
					visible: true,
					editable: true,
				},
				'overweight_charges.basis': {
					label: 'OverWeight Charges Basis',
					ourLabel: 'OverWeight Charges Basis',
					type: 'text',
					enum: ['Percent of basic freight', 'Fixed'],
					visible: true,
					editable: true,
				},
				'advance_charges.rate': {
					label: 'Advance Charges',
					ourLabel: 'Advance Charges',
					type: 'number',
					enum: ['Fixed'],
					visible: true,
					editable: true,
				},
				'advance_charges.basis': {
					label: 'Advance Charges Basis',
					ourLabel: 'Advance Charges Basis',
					type: 'text',
					enum: ['Percent of basic freight', 'Fixed'],
					visible: true,
					editable: true,
				},
				'damage.rate': {
					label: 'Damage Charges',
					ourLabel: 'Damage Charges',
					type: 'number',
					enum: ['Fixed'],
					visible: true,
					editable: true,
				},
				'damage.basis': {
					label: 'Damage Charges Basis',
					ourLabel: 'Damage Charges Basis',
					type: 'text',
					enum: ['Percent of basic freight', 'Fixed'],
					visible: true,
					editable: true,
				},
				'incentive.rate': {
					label: 'Incentive Charges',
					ourLabel: 'Incentive Charges',
					type: 'number',
					visible: true,
					editable: true,
				},
				'incentive.basis': {
					label: 'Incentive Charges Basis',
					ourLabel: 'Incentive Charges Basis',
					type: 'text',
					enum: ['Percent of basic freight', 'Fixed', 'Percent'],
					visible: true,
					editable: false,
				},
				'shortage.rate': {
					label: 'Shortage Charges',
					ourLabel: 'Shortage Charges',
					type: 'number',
					enum: ['Fixed'],
					visible: true,
					editable: true,
				},
				'shortage.basis': {
					label: 'Shortage Charges Basis',
					ourLabel: 'Shortage Charges Basis',
					type: 'text',
					enum: ['Percent of basic freight', 'Fixed'],
					visible: true,
					editable: true,
				},
				'penalty.rate': {
					label: 'Penalty Charges',
					ourLabel: 'Penalty Charges',
					type: 'number',
					enum: ['Fixed'],
					visible: true,
					editable: true,
				},
				'penalty.basis': {
					label: 'Penalty Charges Basis',
					ourLabel: 'Penalty Charges Basis',
					type: 'text',
					enum: ['Percent of basic freight', 'Fixed'],
					visible: true,
					editable: true,
				},
				'extra_running.rate': {
					label: 'Extra Charges',
					ourLabel: 'Extra Charges',
					type: 'number',
					enum: ['Fixed'],
					visible: true,
					editable: true,
				},
				'extra_running.basis': {
					label: 'Extra Charges Basis',
					ourLabel: 'Extra Charges Basis',
					type: 'text',
					enum: ['Percent of basic freight', 'Fixed'],
					visible: true,
					editable: true,
				},
				'dala_charges.rate': {
					label: 'Dala Charges',
					ourLabel: 'Dala Charges',
					type: 'number',
					enum: ['Fixed'],
					visible: true,
					editable: true,
				},
				'dala_charges.basis': {
					label: 'Dala Charges Basis',
					ourLabel: 'Dala Charges Basis',
					type: 'text',
					enum: ['Percent of basic freight', 'Fixed'],
					visible: true,
					editable: true,
				},
				'diesel_charges.rate': {
					label: 'Diesel Charges',
					ourLabel: 'Diesel Charges',
					type: 'number',
					enum: ['Fixed'],
					visible: true,
					editable: true,
				},
				'diesel_charges.basis': {
					label: 'Diesel Charges Basis',
					ourLabel: 'Diesel Charges Basis',
					type: 'text',
					enum: ['Percent of basic freight', 'Fixed'],
					visible: true,
					editable: true,
				},
				'kanta_charges.rate': {
					label: 'Kanta Charges',
					ourLabel: 'Kanta Charges',
					type: 'number',
					enum: ['Fixed'],
					visible: true,
					editable: true,
				},
				'kanta_charges.basis': {
					label: 'Kanta Charges Basis',
					ourLabel: 'Kanta Charges Basis',
					type: 'text',
					enum: ['Percent of basic freight', 'Fixed'],
					visible: true,
					editable: true,
				},
				'factory_halt.rate': {
					label: 'Factory Halt Charges',
					ourLabel: 'Factory Halt Charges',
					type: 'number',
					enum: ['Fixed'],
					visible: true,
					editable: true,
				},
				'factory_halt.basis': {
					label: 'Factory Halt Charges Basis',
					ourLabel: 'Factory Halt Charges Basis',
					type: 'text',
					enum: ['Percent of basic freight', 'Fixed'],
					visible: true,
					editable: true,
				},
				'company_halt.rate': {
					label: 'Company Halt Charges',
					ourLabel: 'Company Halt Charges',
					type: 'number',
					enum: ['Fixed'],
					visible: true,
					editable: true,
				},
				'company_halt.basis': {
					label: 'Company Halt Charges Basis',
					ourLabel: 'Company Halt Charges Basis',
					type: 'text',
					enum: ['Percent of basic freight', 'Fixed'],
					visible: true,
					editable: true,
				},
				'toll_charges.rate': {
					label: 'Toll Tax',
					ourLabel: 'Toll Tax',
					type: 'number',
					enum: ['Fixed'],
					visible: true,
					editable: true,
				},
				'toll_charges.basis': {
					label: 'Toll Tax Basis',
					ourLabel: 'Toll Tax Basis',
					type: 'text',
					enum: ['Percent of basic freight', 'Fixed'],
					visible: true,
					editable: true,
				},
				'internal_rate.rate': {
					label: 'Internal Rate',
					ourLabel: 'Internal Rate',
					type: 'number',
					enum: ['Fixed'],
					visible: true,
					editable: true,
				},
				'internal_rate.basis': {
					label: 'Internal Rate Basis',
					ourLabel: 'Internal Rate Basis',
					type: 'text',
					enum: ['Percent of basic freight', 'Fixed'],
					visible: true,
					editable: true,
				},
				'green_tax.rate': {
					label: 'Green Tax ',
					ourLabel: 'Green Tax ',
					type: 'number',
					enum: ['Fixed'],
					visible: true,
					editable: true,
				},
				'green_tax.basis': {
					label: 'Green Tax Basis',
					ourLabel: 'Green Tax Basis',
					type: 'text',
					enum: ['Percent of basic freight', 'Fixed'],
					visible: true,
					editable: true,
				},
				'twoPtDelivery.rate': {
					label: 'Two Point Delivery ',
					ourLabel: 'Two Point Delivery ',
					type: 'number',
					enum: ['Fixed'],
					visible: true,
					editable: true,
				},
				'twoPtDelivery.basis': {
					label: 'Two Point Delivery Basis',
					ourLabel: 'Two Point Delivery Basis',
					type: 'text',
					enum: ['Percent of basic freight', 'Fixed'],
					visible: true,
					editable: true,
				},
				'standardTime.rate': {
					label: 'Standard Days ',
					ourLabel: 'Standard Days ',
					type: 'number',
					enum: ['Fixed'],
					visible: true,
					editable: true,
				},
				'standardTime.basis': {
					label: 'Standard Days Basis',
					ourLabel: 'Standard Days Basis',
					type: 'text',
					enum: ['Percent of basic freight', 'Fixed'],
					visible: true,
					editable: true,
				},
			},
			GR: {
				branch: {
					label: 'Branch',
					ourLabel: 'Branch',
					type: 'string',
					visible: false,
					editable: true,
					req: true,
				},
				gr_type: {
					label: 'Gr Type',
					ourLabel: 'Gr Type',
					type: 'string',
					visible: false,
					editable: true,
				},
				grNumber: {
					label: 'Gr Number',
					ourLabel: 'Gr Number',
					type: 'string',
					visible: false,
					editable: true,
					req: true,
				},
				grDate: {
					label: 'Gr Date',
					ourLabel: 'Gr Date',
					type: '__date__',
					visible: false,
					editable: true,
					req: true,
				},
				grRemarks: {
					label: 'Gr Remark',
					ourLabel: 'Gr Remark',
					type: 'string',
					visible: false,
					editable: true,
				},
				customer: {
					label: 'Customer',
					ourLabel: 'Customer',
					type: 'string',
					visible: false,
					editable: true,
					req: true,
				},
				consignor: {
					label: 'Consignor',
					ourLabel: 'Consignor',
					type: 'string',
					visible: false,
					editable: true,
					req: true,
				},
				consignee: {
					label: 'Consignee',
					ourLabel: 'Consignee',
					type: 'string',
					visible: false,
					editable: true,
					req: true,
				},
				billingParty: {
					label: 'Billing Party',
					ourLabel: 'Billing Party',
					type: 'string',
					visible: false,
					editable: true,
					req: true,
				},
				payment_basis: {
					label: 'Payment Basis',
					ourLabel: 'Payment Basis',
					type: 'string',
					visible: false,
					editable: true,
					req: true,
				},
				payment_type: {
					label: 'Payment Type',
					ourLabel: 'Payment Type',
					type: 'string',
					visible: false,
					editable: true,
					req: true,
				},
				container: {
					label: 'Container',
					ourLabel: 'Container',
					type: 'string',
					visible: false,
					editable: true,
					req: false,
				},
				internal_rate: {
					label: 'Internal Rate',
					ourLabel: 'Internal Rate',
					type: 'string',
					visible: false,
					editable: true,
				},
				loadingArrivalTime: {
					label: 'Loading Arrival',
					ourLabel: 'Loading Arrival',
					type: 'string',
					visible: false,
					editable: true,
				},
				billingLoadingTime: {
					label: 'Loading End',
					ourLabel: 'Loading End',
					type: 'string',
					visible: false,
					editable: true,
				},
				unloadingArrivalTime: {
					label: 'Unloading Arrival',
					ourLabel: 'Unloading Arrival',
					type: 'string',
					visible: false,
					editable: true,
				},
				billingUnloadingTime: {
					label: 'Unloading End',
					ourLabel: 'Unloading End',
					type: 'string',
					visible: false,
					editable: true,
				},
				standardDays: {
					label: 'Standard Days',
					ourLabel: 'Standard Days',
					type: 'string',
					visible: false,
					editable: true,
				},
				chargeableDays: {
					label: 'Chargeable Days',
					ourLabel: 'Chargeable Days',
					type: 'string',
					visible: false,
					editable: true,
				},
				source: {
					label: 'Source',
					ourLabel: 'Source',
					type: 'string',
					visible: false,
					editable: true,
					req: true,
				},
				destination: {
					label: 'Destination',
					ourLabel: 'Destination',
					type: 'string',
					visible: false,
					editable: true,
					req: true,
				},
				destinationState: {
					label: 'Destination State',
					ourLabel: 'Destination State',
					type: 'string',
					visible: false,
					editable: true,
				},
				billedSource: {
					label: 'Billed Source',
					ourLabel: 'Billed Source',
					type: 'string',
					visible: false,
					editable: true,
					req: true,
				},
				billedDestination: {
					label: 'Billed Destination',
					ourLabel: 'Billed Destination',
					type: 'string',
					visible: false,
					editable: true,
					req: true,
				},
				arRemark: {
					label: 'POD Remark',
					ourLabel: 'POD Remark',
					type: 'string',
					visible: false,
				},
				isGrBillable: {
					label: 'Is Gr Billable',
					ourLabel: 'Is Gr Billable',
					type: 'checkbox',
					visible: false,
					editable: true,
				},
				totFreight: {
					label: 'Trip Total Freight',
					ourLabel: 'Trip Total Freight',
					type: 'string',
					visible: false,
					editable: true,
				},
				totFreightWithCharges: {
					label: 'Trip Total Freight with Charges',
					ourLabel: 'Trip Total Freight with Charges',
					type: 'string',
					visible: false,
					editable: true,
				},
				totQty: {
					label: 'Trip Total Qty',
					ourLabel: 'Trip Total Qty',
					type: 'string',
					visible: false,
					editable: true,
				},
				showOnBill: {
					label: 'Show On Bill',
					ourLabel: 'Show On Bill',
					type: 'string',
					visible: false,
					editable: true,
				},
				materialName: {
					label: 'Material',
					ourLabel: 'Material',
					type: 'string',
					visible: false,
					editable: true,
					req: true,
				},
				materialUnit: {
					label: 'Material Unit',
					ourLabel: 'Material Unit',
					type: 'string',
					visible: false,
					editable: true,
				},
				invoiceNo: {
					label: 'Invoice No.',
					ourLabel: 'Invoice No.',
					type: 'string',
					visible: false,
					editable: true,
				},
				dphRate: {
					label: 'DPH Rate',
					ourLabel: 'DPH Rate',
					type: 'number',
					visible: false,
					editable: true,
				},
				invoiceRate: {
					label: 'Invoice Rate',
					ourLabel: 'Invoice Rate',
					type: 'number',
					visible: false,
					editable: true,
				},
				invoiceAmt: {
					label: 'Invoice Amount',
					ourLabel: 'Invoice Amount',
					type: 'number',
					visible: false,
					editable: true,
				},
				invoiceDate: {
					label: 'Invoice Date',
					ourLabel: 'Invoice Date',
					type: '__date__',
					visible: false,
					editable: true,
				},
				gateoutDate: {
					label: 'Gateout Date',
					ourLabel: 'Gateout Date',
					type: '__date__',
					visible: false,
					editable: true,
				},
				insurRate: {
					label: 'Insurance Rate',
					ourLabel: 'Insurance Rate',
					type: 'number',
					visible: false,
					editable: true,
				},
				insurVal: {
					label: 'Insurance Value',
					ourLabel: 'Insurance Value',
					type: 'number',
					visible: false,
					editable: true,
				},
				loadRefNumber: {
					label: 'Load Ref. Number',
					ourLabel: 'Load Ref. Number',
					type: 'string',
					visible: false,
					editable: true,
				},
				routeDistance: {
					label: 'Km',
					ourLabel: 'Km',
					type: 'number',
					visible: false,
					editable: true,
				},
				rate: {
					label: 'Rate',
					ourLabel: 'Rate',
					type: 'number',
					visible: false,
					editable: true,
					req: true,
				},
				billingRate: {
					label: 'Billing Rate',
					ourLabel: 'Billing Rate',
					type: 'number',
					visible: false,
					editable: true,
				},
				weightPerUnit: {
					label: 'Actual Weight',
					ourLabel: 'Actual Weight',
					type: 'number',
					visible: false,
					editable: true,
				},
				billingWeightPerUnit: {
					label: 'Billing Weight',
					ourLabel: 'Billing Weight',
					type: 'number',
					visible: false,
					editable: true,
				},
				capacity: {
					label: 'Capacity',
					ourLabel: 'Capacity',
					type: 'number',
					visible: false,
					editable: true,
					customValue: true,
					req: true,
				},
				noOfUnits: {
					label: 'Actual Unit',
					ourLabel: 'Actual Unit',
					type: 'number',
					visible: false,
					editable: true,
				},
				billingNoOfUnits: {
					label: 'Billing Unit',
					ourLabel: 'Billing Unit',
					type: 'number',
					visible: false,
					editable: true,
				},
				freight: {
					label: 'Freight',
					ourLabel: 'Freight',
					type: 'computable',
					visible: false,
					editable: true,
				},
				invPayBasis: {
					label: 'Pay. Basis',
					ourLabel: 'Pay. Basis',
					type: 'string',
					visible: false,
					editable: false,
				},
				ref1: {
					label: 'Item Ref 1',
					ourLabel: 'Item Ref 1',
					type: 'string',
					visible: false,
					editable: true,
				},
				ref2: {
					label: 'Item Ref 2',
					ourLabel: 'Item Ref 2',
					type: 'string',
					visible: false,
					editable: true,
				},
				ref3: {
					label: 'Item Ref 3',
					ourLabel: 'Item Ref 3',
					type: 'string',
					editable: true,
				},
				ref4: {
					label: 'Item Ref 4',
					ourLabel: 'Item Ref 4',
					type: 'string',
					editable: true,
				},
				ref5: {
					label: 'Item Ref 5',
					ourLabel: 'Item Ref 5',
					type: 'string',
					editable: true,
				},
				ref6: {
					label: 'Item Ref 6',
					ourLabel: 'Item Ref 6',
					type: 'string',
					editable: true,
				},
				num1: {
					label: 'Num 1',
					ourLabel: 'Num 1',
					type: 'number',
					editable: true,
				},
				num2: {
					label: 'Num 2',
					ourLabel: 'Num 2',
					type: 'number',
					editable: true,
				},
				num3: {
					label: 'Num 3',
					ourLabel: 'Num 3',
					type: 'number',
					editable: true,
				},
				basicFreight: {
					label: 'Basic Freight',
					ourLabel: 'Basic Freight',
					type: 'number',
					visible: true,
					editable: true,
				},
				num4: {
					label: 'Base Value 1',
					ourLabel: 'Base Value 1',
					type: 'number',
					editable: true,
				},
				num5: {
					label: 'Base Value 5',
					ourLabel: 'Base Value 5',
					type: 'number',
					editable: true,
				},
				num6: {
					label: 'Base Value 6',
					ourLabel: 'Base Value 6',
					type: 'number',
					editable: true,
				},
				grCharges: {
					label: 'Gr Charges',
					ourLabel: 'Gr Charges',
					notApplyTax: false,
					type: 'number',
					visible: false,
					editable: true,
				},
				surCharges: {
					label: 'Surcharge',
					ourLabel: 'Surcharge',
					notApplyTax: false,
					type: 'number',
					visible: false,
					editable: true,
				},
				cartageCharges: {
					label: 'Cartage Charge',
					ourLabel: 'Cartage Charge',
					notApplyTax: false,
					type: 'number',
					visible: false,
					editable: true,
				},
				labourCharges: {
					label: 'Labour Charge',
					ourLabel: 'Labour Charge',
					notApplyTax: false,
					type: 'number',
					visible: false,
					editable: true,
				},
				prevFreightCharges: {
					label: 'Prev Freight Charge',
					ourLabel: 'Prev Freight Charge',
					notApplyTax: false,
					type: 'number',
					visible: false,
					editable: true,
				},
				discount: {
					label: 'Discount',
					ourLabel: 'Discount',
					type: 'number',
					deduction: true,
					notApplyTax: false,
					visible: false,
					editable: true,
				},
				loading_charges: {
					label: 'Loading Charges',
					ourLabel: 'Loading Charges',
					notApplyTax: false,
					type: 'number',
					visible: false,
					editable: true,
				},
				unloading_charges: {
					label: 'Unloading Charges',
					ourLabel: 'Unloading Charges',
					notApplyTax: false,
					type: 'number',
					visible: false,
					editable: true,
				},
				loading_amount: {
					label: 'Loading Amount',
					ourLabel: 'Loading Amount',
					notApplyTax: false,
					type: 'number',
					visible: false,
					editable: true,
				},
				unloading_amount: {
					label: 'Unloading Amount',
					ourLabel: 'Unloading Amount',
					notApplyTax: false,
					type: 'number',
					visible: false,
					editable: true,
				},
				weightman_charges: {
					label: 'Weightman Charges',
					ourLabel: 'Weightman Charges',
					notApplyTax: false,
					type: 'number',
					visible: false,
					editable: true,
				},
				overweight_charges: {
					label: 'Overweight Charges',
					ourLabel: 'Overweight Charges',
					notApplyTax: false,
					type: 'number',
					visible: false,
					editable: true,
				},
				advance_charges: {
					label: 'Advance Charges',
					ourLabel: 'Advance Charges',
					type: 'number',
					deduction: true,
					notApplyTax: false,
					visible: false,
					editable: true,
				},
				damage: {
					label: 'Damage Charges',
					ourLabel: 'Damage Charges',
					type: 'number',
					deduction: true,
					notApplyTax: false,
					visible: false,
					editable: true,
				},
				detentionLoading: {
					label: 'Loading Detention',
					ourLabel: 'Loading Detention',
					type: 'number',
					deduction: true,
					notApplyTax: false,
					visible: false,
					editable: true,
				},
				detentionUnloading: {
					label: 'Unloading Detention',
					ourLabel: 'Unloading Detention',
					type: 'number',
					deduction: true,
					notApplyTax: false,
					visible: false,
					editable: true,
				},
				incentivePercent: {
					label: 'Incentive Percent',
					ourLabel: 'Incentive Percent',
					type: 'number',
					visible: false,
				},
				incentive: {
					label: 'Incentive',
					ourLabel: 'Incentive',
					notApplyTax: false,
					type: 'number',
					visible: false,
				},
				shortage: {
					label: 'Shortage Charges',
					ourLabel: 'Shortage Charges',
					type: 'number',
					deduction: true,
					notApplyTax: false,
					visible: false,
					editable: true,
				},
				penalty: {
					label: 'Penalty Charges',
					ourLabel: 'Penalty Charges',
					type: 'number',
					deduction: true,
					notApplyTax: false,
					visible: false,
					editable: true,
				},
				other_charges: {
					label: 'Other Charges',
					ourLabel: 'Other Charges',
					notApplyTax: false,
					type: 'number',
					visible: false,
					editable: true,
				},
				extra_running: {
					label: 'Extra Charges',
					ourLabel: 'Extra Charges',
					notApplyTax: false,
					type: 'number',
					visible: false,
					editable: true,
				},
				dala_charges: {
					label: 'Dala Charges',
					ourLabel: 'Dala Charges',
					notApplyTax: false,
					type: 'number',
					visible: false,
					editable: true,
				},
				kanta_charges: {
					label: 'Kanta Charges',
					ourLabel: 'Kanta Charges',
					notApplyTax: false,
					type: 'number',
					visible: false,
					editable: true,
				},
				factory_halt: {
					label: 'Factory Halt',
					ourLabel: 'Factory Halt',
					notApplyTax: false,
					type: 'number',
					visible: false,
					editable: true,
				},
				company_halt: {
					label: 'Company Halt',
					ourLabel: 'Company Halt',
					notApplyTax: false,
					type: 'number',
					visible: false,
					editable: true,
				},
				toll_charges: {
					label: 'Toll Charges',
					ourLabel: 'Toll Charges',
					notApplyTax: false,
					type: 'number',
					visible: false,
					editable: true,
				},
				green_tax: {
					label: 'Green Tax',
					ourLabel: 'Green Tax',
					notApplyTax: false,
					type: 'number',
					visible: false,
					editable: true,
				},
				ttDelay: {
					label: 'TT Delay',
					ourLabel: 'TT Delay',
					type: 'number',
					deduction: true,
					notApplyTax: false,
					visible: false,
					editable: true,
				},
				twoPtDelivery: {
					label: 'Two Point Delivery',
					ourLabel: 'Two Point Delivery',
					notApplyTax: false,
					type: 'number',
					visible: false,
					editable: true,
				},
				diesel_charges: {
					label: 'Diesel Charge',
					ourLabel: 'Diesel Charge',
					notApplyTax: false,
					type: 'number',
					visible: false,
					editable: true,
				},
				diesel_index: {
					label: 'Diesel Index',
					ourLabel: 'Diesel Index',
					type: 'number',
					visible: false,
					editable: true,
				},
				freightWithDiesel: {
					label: 'Basic Freight(Diesel)',
					ourLabel: 'Basic Freight(Diesel)',
					notApplyTax: false,
					type: 'computable',
					visible: false,
					editable: false,
				},
				nbLoading: {
					label: 'Non Billable Loading',
					ourLabel: 'NB Loading',
					type: 'number',
					isNonBillable: false,
					visible: false,
					editable: true,
				},
				nbUnLoading: {
					label: 'Non Billable Unloading',
					ourLabel: 'NB Unloading',
					type: 'number',
					visible: false,
					isNonBillable: false,
					editable: true,
				},
				nbDala: {
					label: 'Non Billable Dala',
					ourLabel: 'NB Dala Charges',
					type: 'number',
					visible: false,
					isNonBillable: false,
					editable: true,
				},
				nbKanta: {
					label: 'Non Billable Kanta',
					ourLabel: 'NB Kanta Charges',
					type: 'number',
					visible: false,
					isNonBillable: false,
					editable: true,
				},
				nbToll: {
					label: 'Non Billable Toll',
					ourLabel: 'NB Toll Charges',
					type: 'number',
					visible: false,
					isNonBillable: false,
					editable: true,
				},
				nbGrCharges: {
					label: 'Non Billable GrCharges',
					ourLabel: 'NB Gr Charges',
					type: 'number',
					visible: false,
					isNonBillable: false,
					editable: true,
				},
				nbGreen_tax: {
					label: 'Non Billable GreenTax',
					ourLabel: 'NB Green Tax',
					type: 'number',
					visible: false,
					isNonBillable: false,
					editable: true,
				},
				nbTwoPtDelivery: {
					label: 'Non Billable TwoPt Delivery',
					ourLabel: 'NB TwoPt Delivery',
					type: 'number',
					visible: false,
					isNonBillable: false,
					editable: true,
				},
				nbLabourCharges: {
					label: 'Non Billable Labour',
					ourLabel: 'NB Labour Charges',
					type: 'number',
					visible: false,
					isNonBillable: false,
					editable: true,
				},
				nbOther: {
					label: 'Non Billable Other',
					ourLabel: 'NB Other Charges',
					type: 'number',
					visible: false,
					isNonBillable: false,
					editable: true,
				},
				isSupplementaryShow: {
					label: 'Is Supplementary Show',
					ourLabel: 'Is Supplementary Show',
					notApplyTax: false,
					type: 'checkbox',
					visible: false,
					editable: true,
				},
				suppRate: {
					label: 'Supp Rate',
					ourLabel: 'Supp Rate',
					type: 'number',
					isSupplymentry: true,
					modelKey: 'rate',
					visible: false,
					editable: true,
				},
				suppRouteDistance: {
					label: 'Supp Route Distance',
					ourLabel: 'Supp Route Distance',
					type: 'number',
					isSupplymentry: true,
					modelKey: 'routeDistance',
					visible: false,
					editable: false,
				},
				suppIncentivePercent: {
					label: 'Supp Incentive Percent',
					ourLabel: 'Supp Incentive Percent',
					isSupplymentry: true,
					type: 'number',
					visible: false,
				},
				suppGrCharges: {
					label: 'Supp Gr Charges',
					ourLabel: 'Supp Gr Charges',
					isSupplymentry: true,
					modelKey: 'grCharges',
					type: 'number',
					visible: false,
					editable: true,
				},
				suppTtDelay: {
					label: 'Supp TT Delay',
					ourLabel: 'Supp TT Delay',
					isSupplymentry: true,
					modelKey: 'ttDelay',
					deduction: true,
					notApplyTax: false,
					type: 'number',
					visible: false,
					editable: true,
				},
				suppSurCharges: {
					label: 'Supp SurCharges',
					ourLabel: 'Supp SurCharges',
					isSupplymentry: true,
					modelKey: 'surCharges',
					type: 'number',
					visible: false,
					editable: true,
				},
				suppCartageCharges: {
					label: 'Supp Cartage Charge',
					ourLabel: 'Supp Cartage Charge',
					isSupplymentry: true,
					modelKey: 'cartageCharges',
					type: 'number',
					visible: false,
					editable: true,
				},
				suppLabourCharges: {
					label: 'Supp Labour Charge',
					ourLabel: 'Supp Labour Charge',
					isSupplymentry: true,
					modelKey: 'labourCharges',
					type: 'number',
					visible: false,
					editable: true,
				},
				suppPrevFreightCharges: {
					label: 'Supp Prev Freight Charge',
					ourLabel: 'Supp Prev Freight Charge',
					isSupplymentry: true,
					modelKey: 'prevFreightCharges',
					type: 'number',
					visible: false,
					editable: true,
				},
				suppDiscount: {
					label: 'Supp Discount',
					ourLabel: 'Supp Discount',
					isSupplymentry: true,
					modelKey: 'discount',
					deduction: true,
					notApplyTax: false,
					type: 'number',
					visible: false,
					editable: true,
				},
				suppLoading_charges: {
					label: 'Supp Loading Charges',
					ourLabel: 'Supp Loading Charges',
					isSupplymentry: true,
					modelKey: 'loading_charges',
					type: 'number',
					visible: false,
					editable: true,
				},
				suppUnloading_charges: {
					label: 'Supp Unloading Charges',
					ourLabel: 'Supp Unloading Charges',
					isSupplymentry: true,
					modelKey: 'unloading_charges',
					type: 'number',
					visible: false,
					editable: true,
				},
				suppWeightman_charges: {
					label: 'Supp Weightman Charges',
					ourLabel: 'Supp Weightman Charges',
					isSupplymentry: true,
					modelKey: 'weightman_charges',
					type: 'number',
					visible: false,
					editable: true,
				},
				suppOverweight_charges: {
					label: 'Supp Overweight Charges',
					ourLabel: 'Supp Overweight Charges',
					isSupplymentry: true,
					modelKey: 'overweight_charges',
					type: 'number',
					visible: false,
					editable: true,
				},
				suppAdvance_charges: {
					label: 'Supp Advance Charges',
					ourLabel: 'Supp Advance Charges',
					isSupplymentry: true,
					modelKey: 'advance_charges',
					deduction: true,
					notApplyTax: false,
					type: 'number',
					visible: false,
					editable: true,
				},
				suppDamage: {
					label: 'Supp Damage Charges',
					ourLabel: 'Supp Damage Charges',
					isSupplymentry: true,
					modelKey: 'damage',
					deduction: true,
					notApplyTax: false,
					type: 'number',
					visible: false,
					editable: true,
				},
				suppIncentive: {
					label: 'Supp Incentive',
					ourLabel: 'Supp Incentive',
					isSupplymentry: true,
					modelKey: 'incentive',
					type: 'number',
					visible: false,
				},
				suppShortage: {
					label: 'Supp Shortage Charges',
					ourLabel: 'Supp Shortage Charges',
					isSupplymentry: true,
					modelKey: 'shortage',
					deduction: true,
					notApplyTax: false,
					type: 'number',
					visible: false,
					editable: true,
				},
				suppPenalty: {
					label: 'Supp Penalty Charges',
					ourLabel: 'Supp Penalty Charges',
					isSupplymentry: true,
					modelKey: 'penalty',
					deduction: true,
					notApplyTax: false,
					type: 'number',
					visible: false,
					editable: true,
				},
				suppOther_charges: {
					label: 'Supp Other Charges',
					ourLabel: 'Supp Other Charges',
					isSupplymentry: true, modelKey: 'other_charges',
					type: 'number',
					visible: false,
					editable: true,
				},
				suppExtra_running: {
					label: 'Supp Extra Charges',
					ourLabel: 'Supp Extra Charges',
					isSupplymentry: true,
					modelKey: 'extra_running',
					type: 'number',
					visible: false,
					editable: true,
				},
				suppDala_charges: {
					label: 'Supp Dala Charges',
					ourLabel: 'Supp Dala Charges',
					isSupplymentry: true,
					modelKey: 'dala_charges',
					type: 'number',
					visible: false,
					editable: true,
				},
				suppKanta_charges: {
					label: 'Supp Kanta Charges',
					ourLabel: 'Supp Kanta Charges',
					isSupplymentry: true,
					modelKey: 'kanta_charges',
					type: 'number',
					visible: false,
					editable: true,
				},
				suppFactory_halt: {
					label: 'Supp Factory Halt',
					ourLabel: 'Supp Factory Halt',
					isSupplymentry: true,
					modelKey: 'factory_halt',
					type: 'number',
					visible: false,
					editable: true,
				},
				suppCompany_halt: {
					label: 'Supp Company Halt',
					ourLabel: 'Supp Company Halt',
					isSupplymentry: true,
					modelKey: 'company_halt',
					type: 'number',
					visible: false,
					editable: true,
				},
				suppToll_charges: {
					label: 'Supp Toll Charges',
					ourLabel: 'Supp Toll Charges',
					isSupplymentry: true,
					modelKey: 'toll_charges',
					type: 'number',
					visible: false,
					editable: true,
				},
				suppGreen_tax: {
					label: 'Supp Green Tax',
					ourLabel: 'Supp Green Tax',
					isSupplymentry: true,
					modelKey: 'green_tax',
					type: 'number',
					visible: false,
					editable: true,
				},
				suppTwoPtDelivery: {
					label: 'Supp Two Point Delivery',
					ourLabel: 'Supp Two Point Delivery',
					isSupplymentry: true,
					modelKey: 'twoPtDelivery',
					type: 'number',
					visible: false,
					editable: true,
				},
				suppDiesel_charges: {
					label: 'Supp Diesel Charge',
					ourLabel: 'Supp Diesel Charge',
					isSupplymentry: true,
					modelKey: 'diesel_charges',
					type: 'number',
					visible: false,
					editable: true,
				},
				suppDetentionLoading: {
					label: 'Supp Loading Detention',
					ourLabel: 'Supp Loading Detention',
					isSupplymentry: true,
					modelKey: 'detentionLoading',
					type: 'number',
					visible: false,
					editable: true,
				},
				suppDetentionUnloading: {
					label: 'Supp Unloading Detention',
					ourLabel: 'Supp Unloading Detention',
					isSupplymentry: true,
					modelKey: 'detentionUnloading',
					type: 'number',
					visible: false,
					editable: true,
				},
				suppBasicFreight: {
					label: 'Supp basicFreight',
					ourLabel: 'Supp basicFreight',
					isSupplymentry: true,
					modelKey: 'basicFreight',
					type: 'number',
					visible: false,
					editable: true,
				},
				eWayBillNum: {
					label: 'Eway Bill',
					ourLabel: 'Eway Bill',
					type: 'computable',
					visible: false,
					editable: true,
					req: true
				},
				eWayBillExp: {
					label: 'Eway Bill Exp',
					ourLabel: 'Eway Bill Exp',
					type: '__date__',
					visible: false,
					editable: true,
					req: true
				},
				detentionLoadingRate: {
					label: 'Detention Loading Rate',
					ourLabel: 'Detention Loading Rate',
					type: 'computable',
					visible: false,
					editable: true,
				},
				detentionUnloadingRate: {
					label: 'Detention Unloading Rate',
					ourLabel: 'Detention Unloading Rate',
					type: 'computable',
					visible: false,
					editable: true,
				}
			},
		},

		aReportTypeConfig: {
			DLP: {
				filter: [
					{
						name: 'from'
					},
					{
						name: 'to'
					}
				],

				tableHeader: {
					Vehicle_No: {
						name: 'Vehicle No',
						key: 'vehicle_no',
						type: 'string',
					},
					Trip_Start: {
						name: 'Trip Start',
						key: 'trip_start_status.date',
						type: '__date__',
					},
					Segment: {
						name: 'Segment',
						key: 'segment_type',
						type: 'string',
					},
					trip_no: {
						name: 'Trip No',
						key: 'trip_no',
						type: 'string',
					},
					Route: {
						name: 'Route',
						key: 'route_name',
						type: 'string',
					},
					KM: {
						name: 'KM',
						key: 'route.route_distance',
						type: 'number',
					},
					Revenue: {
						name: 'Revenue',
						key: 'internal_freight',
						type: 'number',
					},
					Revenue_KM: {
						name: 'Revenue/KM',
						key: 'this["revenue/km"]',
						type: 'number',
						eval: true
					},
					cashAdvance: {
						name: 'Advance cash',
						key: 'tAdv.cashAdvance',
						type: 'number',
					},
					dieselAdvance: {
						name: 'Advance diesel',
						key: 'tAdv.dieselAdvance',
						type: 'number'
					},
					totalAdvance: {
						name: 'Total Advance',
						key: 'tAdv.totalAdvance',
						type: 'number'
					},
					Adv_km: {
						name: 'Advance/KM',
						key: 'this["adv/km"]',
						type: 'number'
					},
					Profit: {
						name: 'Profit',
						key: 'profit',
						type: 'number',
					},
					Profit_KM: {
						name: 'Profit/KM',
						key: 'this["profit/km"]',
						type: 'number',
						eval: true
					},
				},

				summary: {
					'tInternal_freight': {
						label: 'Total Internal Freight',
						type: 'number',
						key: 'tInternal_freight',
						visible: true,
					},
					'tTotalKM': {
						label: 'Total KM',
						type: 'number',
						key: 'tTotalKM',
						visible: true,
					},
					'tTotal_expense': {
						label: 'Total Expense',
						type: 'number',
						key: 'tTotal_expense',
						visible: true,
					},
					'tTotal_profit': {
						label: 'Total Profit',
						type: 'number',
						key: 'tTotal_profit',
						visible: true,
					},
					'tripsCount': {
						label: 'Total Trips',
						type: 'number',
						key: 'tripsCount',
						visible: true,
					},
				},

				api: {
					'name': 'getDlpDupReport'
				}

			},
			DUP: {
				filter: [
					{
						name: 'from'
					},
					{
						name: 'to'
					}
				],

				tableHeader: {
					Vehicle_No: {
						name: 'Vehicle No',
						key: 'vehicle_no',
						type: 'string',
					},
					Trip_Start: {
						name: 'Trip Start',
						key: 'trip_start_status.date',
						type: '__date__',
					},
					Segment: {
						name: 'Segment',
						key: 'segment_type',
						type: 'string',
					},
					trip_no: {
						name: 'Trip No',
						key: 'trip_no',
						type: 'string',
					},
					Route: {
						name: 'Route',
						key: 'route_name',
						type: 'string',
					},
					KM: {
						name: 'KM',
						key: 'route.route_distance',
						type: 'number',
					},
					Revenue: {
						name: 'Revenue',
						key: 'internal_freight',
						type: 'number',
					},
					Revenue_KM: {
						name: 'Revenue/KM',
						key: 'this["revenue/km"]',
						type: 'number',
						eval: true
					},
					cashAdvance: {
						name: 'Advance cash',
						key: 'tAdv.cashAdvance',
						type: 'number',
					},
					dieselAdvance: {
						name: 'Advance diesel',
						key: 'tAdv.dieselAdvance',
						type: 'number'
					},
					totalAdvance: {
						name: 'Total Advance',
						key: 'tAdv.totalAdvance',
						type: 'number'
					},
					Adv_km: {
						name: 'Advance/KM',
						key: 'this["adv/km"]',
						type: 'number'
					},
					Profit: {
						name: 'Profit',
						key: 'profit',
						type: 'number',
					},
					Profit_KM: {
						name: 'Profit/KM',
						key: 'this["profit/km"]',
						type: 'number',
						eval: true
					},
				},

				summary: {
					'tInternal_freight': {
						label: 'Total Internal Freight',
						type: 'number',
						key: 'tInternal_freight',
						visible: true,
					},
					'tTotalKM': {
						label: 'Total KM',
						type: 'number',
						key: 'tTotalKM',
						visible: true,
					},
					'tTotal_expense': {
						label: 'Total Expense',
						type: 'number',
						key: 'tTotal_expense',
						visible: true,
					},
					'tTotal_profit': {
						label: 'Total Profit',
						type: 'number',
						key: 'tTotal_profit',
						visible: true,
					},

				},

				api: {
					'name': 'getDlpDupReport'
				}

			},
			// Expense Report
			'RTP Expense': {
				filter: [
					{
						name: 'from'
					},
					{
						name: 'to'
					},
					{
						name: 'RT No'
					},
					{
						name: 'Segment Type'
					}
				],
				tableHeader: {
					RT_No: {
						name: 'RT No',
						key: '_id',
						type: 'number',
					},
					/*RT_Date: {
						name: 'RT Date',
						key: 'trips.slice(-1)[0].advSettled.date',
						type: '__date__',
					},*/
					Settlement_Date: {
						name: 'Settlement Date',
						key: 'trips.slice(-1)[0].markSettle.date',
						type: '__date__',
						date: 'dd-MMM-yyyy'
					},
					Vehicle_No: {
						name: 'Vehicle No',
						key: 'trips.slice(-1)[0].vehicle_no',
						type: 'string',
					},
					Driver: {
						name: 'Driver',
						key: 'trips.slice(-1)[0].driver.name',
						type: 'string',
					},
					Trip_Start: {
						name: 'RT Start',
						key: 'firstTripStart.date',
						type: '__date__',
						date: 'dd-MMM-yyyy'
					},
					Trip_End: {
						name: 'RT End',
						key: 'lastTripEnd.date',
						type: '__date__',
						date: 'dd-MMM-yyyy'
					},
					// Segment: {
					// 	name: 'Segment',
					// key: 'trips.slice(-1)[0].segment_type',
					// key: 'allSegments.join(", ")',
					// type: 'string',
					// },
					fleet: {
						name: 'Fleet',
						key: 'trips.slice(-1)[0].vehicle.owner_group',
						type: 'string',
					},
					// Vehicle_Type: {
					// 	name: 'Vehicle Type',
					// 	key: 'trips.slice(-1)[0].vehicle.veh_type_name',
					// 	type: 'string',
					// },
					Total_KM: {
						name: 'Total KM',
						key: 'totalKM',
						type: 'number',
					},
					Advance: {
						name: 'Advance',
						key: 'total_advance',
						type: 'number',
					},
					TT_days: {
						name: 'TT days',
						key: 'rtElapsed.toFixed(0)',
						type: 'string',
						date: false
					},
					Revenue: {
						name: 'Revenue',
						key: 'total_internal_freight',
						type: 'number',
					},
					Revenue_KM: {
						name: 'Revenue/KM',
						key: 'this["revenue/km"]',
						type: 'number',
						eval: true
					},
					Expense: {
						name: 'Expense',
						key: 'netExpense',
						type: 'number',
					},
					Expense_KM: {
						name: 'Expense/KM',
						key: 'this["expense/km"]',
						type: 'number',
						eval: true
					},
					Profit: {
						name: 'Profit',
						key: 'total_actual_profit',
						type: 'number',
					},
					Profit_KM: {
						name: 'Profit/KM',
						key: 'this["profit/km"]',
						type: 'number',
						eval: true
					},
					Profit_Day: {
						name: 'Profit/Day',
						key: 'this["profit/day"]',
						type: 'number',
						eval: true
					},
					diesel: {
						name: 'Diesel (Ltr.)',
						key: 'this["total_diesel"]',
						type: 'number',
						eval: true
					},
					// Add New Fields
					Total_Border: {
						name: 'Total Border',
						key: 'this["totBorderExp"]',
						type: 'number',
						eval: true
					},
					Total_Challan: {
						name: 'Total Challan',
						key: 'this["totChallanExp"]',
						type: 'number',
						eval: true
					},
					Total_Dala_Commision: {
						name: 'Total Dala Commision',
						key: 'this["totDatacommiExp"]',
						type: 'number',
						eval: true
					},
					Total_Diesal: {
						name: 'Total Diesal',
						key: 'this["totDiesalExp"]',
						type: 'number',
						eval: true
					},
					Total_Fixed: {
						name: 'Total Fixed',
						key: 'this["totFixedSalExp"]',
						type: 'number',
						eval: true
					},
					Total_OK_Time: {
						name: 'Total OK Time',
						key: 'this["totOktimeExp"]',
						type: 'number',
						eval: true
					},
					Total_Parking: {
						name: 'Total Parking',
						key: 'this["totParkingExp"]',
						type: 'number',
						eval: true
					},
					Total_Rajai: {
						name: 'Total Rajai',
						key: 'this["totRajaiExp"]',
						type: 'number',
						eval: true
					},
					Total_Repair: {
						name: 'Total Repair',
						key: 'this["totRepairExp"]',
						type: 'number',
						eval: true
					},
					Total_Roti: {
						name: 'Total Roti',
						key: 'this["totRotiExp"]',
						type: 'number',
						eval: true
					},
					Total_Service: {
						name: 'Total Service',
						key: 'this["totServiceExp"]',
						type: 'number',
						eval: true
					},
					Total_Extra: {
						name: 'Total Extra',
						key: 'this["totExtraExp"]',
						type: 'number',
						eval: true
					},
					Total_MissPend: {
						name: 'Total MissPend',
						key: 'this["totMissPendExp"]',
						type: 'number',
						eval: true
					},
					Total_TollTax: {
						name: 'Total TollTax',
						key: 'this["totTollTaxExp"]',
						type: 'number',
						eval: true
					},
					Total_Wages: {
						name: 'Total Wages',
						key: 'this["totWagesExp"]',
						type: 'number',
						eval: true
					},
					//END
					Route: {
						name: 'Route',
						key: 'trips|arrayOfString:"route_name"',
						type: 'string',
					},
					Settlement_By: {
						name: 'Settlement By',
						key: 'trips.slice(-1)[0].markSettle.user_full_name',
						type: 'string',
					},
					Settlement_Remark: {
						name: 'Settlement Remark',
						key: 'trips.slice(-1)[0].markSettle.remark',
						type: 'string',
					},
					Audit_Date: {
						name: 'Audit Date',
						key: 'trips.slice(-1)[0].advSettled.creation.date',
						type: '__date__',
					},
					Audit_By: {
						name: 'Audit By',
						key: 'trips.slice(-1)[0].advSettled.creation.user',
						type: 'string',
					},
				},
				summary: {
					'tExpense/km': {
						label: 'Total Expense/KM',
						type: 'number',
						key: 'tExpense/km',
						visible: true,
					},
					'tNetExpense': {
						label: 'Total Net Expense',
						type: 'number',
						key: 'tNetExpense',
						visible: true,
					},
					'tInternalFreight': {
						label: 'Total Internal Freight',
						type: 'number',
						key: 'tInternalFreight',
						visible: true,
					},
					'tProfit/day': {
						label: 'Total Profit/day',
						type: 'number',
						key: 'tProfit/day',
						visible: true,
					},
					'tProfit/km': {
						label: 'Total Profit/km',
						type: 'number',
						key: 'tProfit/km',
						visible: true,
					},
					'tRevenue/km': {
						label: 'Total Revenue/km',
						type: 'number',
						key: 'tRevenue/km',
						visible: true,
					},
					'tRtElapsed': {
						label: 'Total RtElapsed',
						type: 'number',
						key: 'tRtElapsed',
						visible: true,
					},
					'tTotalKM': {
						label: 'Total Round Trip KM',
						type: 'number',
						key: 'tTotalKM',
						visible: true,
					},
					'tTotal_advance': {
						label: 'Total Advance',
						type: 'number',
						key: 'tTotal_advance',
						visible: true,
					},
					'tTotal_actual_profit': {
						label: 'Total Actual Profit',
						type: 'number',
						key: 'tTotal_actual_profit',
						visible: true,
					},
					'tTotal_diesel': {
						label: 'Total Diesel',
						type: 'number',
						key: 'tTotal_diesel',
						visible: true,
					}
				},
				api: {
					'name': 'getReport'
				}
			},
			'RTP Expense New': {
				filter: [
					{
						name: 'from'
					},
					{
						name: 'to'
					},
					{
						name: 'RT No'
					},
					{
						name: 'Segment Type'
					}
				],
				tableHeader: {
					RT_No: {
						name: 'RT No',
						key: '_id',
						type: 'number',
					},
					/*RT_Date: {
						name: 'RT Date',
						key: 'trips.slice(-1)[0].advSettled.date',
						type: '__date__',
					},*/
					Settlement_Date: {
						name: 'Settlement Date',
						key: 'trips.slice(-1)[0].markSettle.date',
						type: '__date__',
						date: 'dd-MMM-yyyy'
					},
					Vehicle_No: {
						name: 'Vehicle No',
						key: 'trips.slice(-1)[0].vehicle_no',
						type: 'string',
					},
					Driver: {
						name: 'Driver',
						key: 'trips.slice(-1)[0].driver.name',
						type: 'string',
					},
					Trip_Start: {
						name: 'RT Start',
						key: 'firstTripStart.date',
						type: '__date__',
						date: 'dd-MMM-yyyy'
					},
					Trip_End: {
						name: 'RT End',
						key: 'lastTripEnd.date',
						type: '__date__',
						date: 'dd-MMM-yyyy'
					},
					// Segment: {
					// 	name: 'Segment',
					// key: 'trips.slice(-1)[0].segment_type',
					// key: 'allSegments.join(", ")',
					// type: 'string',
					// },
					fleet: {
						name: 'Fleet',
						key: 'trips.slice(-1)[0].vehicle.owner_group',
						type: 'string',
					},
					// Vehicle_Type: {
					// 	name: 'Vehicle Type',
					// 	key: 'trips.slice(-1)[0].vehicle.veh_type_name',
					// 	type: 'string',
					// },
					Total_KM: {
						name: 'Total KM',
						key: 'totalKM',
						type: 'number',
					},
					Advance: {
						name: 'Advance',
						key: 'total_advance',
						type: 'number',
					},
					TT_days: {
						name: 'TT days',
						key: 'rtElapsed.toFixed(0)',
						type: 'string',
						date: false
					},
					Revenue: {
						name: 'Revenue',
						key: 'total_internal_freight',
						type: 'number',
					},
					Revenue_KM: {
						name: 'Revenue/KM',
						key: 'this["revenue/km"]',
						type: 'number',
						eval: true
					},
					Expense: {
						name: 'Expense',
						key: 'netExpense',
						type: 'number',
					},
					Expense_KM: {
						name: 'Expense/KM',
						key: 'this["expense/km"]',
						type: 'number',
						eval: true
					},
					Profit: {
						name: 'Profit',
						key: 'total_actual_profit',
						type: 'number',
					},
					Profit_KM: {
						name: 'Profit/KM',
						key: 'this["profit/km"]',
						type: 'number',
						eval: true
					},
					Profit_Day: {
						name: 'Profit/Day',
						key: 'this["profit/day"]',
						type: 'number',
						eval: true
					},
					diesel: {
						name: 'Diesel (Ltr.)',
						key: 'this["total_diesel"]',
						type: 'number',
						eval: true
					},
					// Add New Fields
					Total_Border: {
						name: 'Total Border',
						key: 'this["totBorderExp"]',
						type: 'number',
						eval: true
					},
					Total_Challan: {
						name: 'Total Challan',
						key: 'this["totChallanExp"]',
						type: 'number',
						eval: true
					},
					Total_Dala_Commision: {
						name: 'Total Dala Commision',
						key: 'this["totDatacommiExp"]',
						type: 'number',
						eval: true
					},
					Total_Diesal: {
						name: 'Total Diesal',
						key: 'this["totDiesalExp"]',
						type: 'number',
						eval: true
					},
					Total_Fixed: {
						name: 'Total Fixed',
						key: 'this["totFixedSalExp"]',
						type: 'number',
						eval: true
					},
					Total_OK_Time: {
						name: 'Total OK Time',
						key: 'this["totOktimeExp"]',
						type: 'number',
						eval: true
					},
					Total_Parking: {
						name: 'Total Parking',
						key: 'this["totParkingExp"]',
						type: 'number',
						eval: true
					},
					Total_Rajai: {
						name: 'Total Rajai',
						key: 'this["totRajaiExp"]',
						type: 'number',
						eval: true
					},
					Total_Repair: {
						name: 'Total Repair',
						key: 'this["totRepairExp"]',
						type: 'number',
						eval: true
					},
					Total_Roti: {
						name: 'Total Roti',
						key: 'this["totRotiExp"]',
						type: 'number',
						eval: true
					},
					Total_Service: {
						name: 'Total Service',
						key: 'this["totServiceExp"]',
						type: 'number',
						eval: true
					},
					Total_Extra: {
						name: 'Total Extra',
						key: 'this["totExtraExp"]',
						type: 'number',
						eval: true
					},
					Total_MissPend: {
						name: 'Total MissPend',
						key: 'this["totMissPendExp"]',
						type: 'number',
						eval: true
					},
					Total_TollTax: {
						name: 'Total TollTax',
						key: 'this["totTollTaxExp"]',
						type: 'number',
						eval: true
					},
					Total_Wages: {
						name: 'Total Wages',
						key: 'this["totWagesExp"]',
						type: 'number',
						eval: true
					},
					//END
					Route: {
						name: 'Route',
						key: 'trips|arrayOfString:"route_name"',
						type: 'string',
					},
					Settlement_By: {
						name: 'Settlement By',
						key: 'trips.slice(-1)[0].markSettle.user_full_name',
						type: 'string',
					},
					Settlement_Remark: {
						name: 'Settlement Remark',
						key: 'trips.slice(-1)[0].markSettle.remark',
						type: 'string',
					},
					Audit_Date: {
						name: 'Audit Date',
						key: 'trips.slice(-1)[0].advSettled.creation.date',
						type: '__date__',
					},
					Audit_By: {
						name: 'Audit By',
						key: 'trips.slice(-1)[0].advSettled.creation.user',
						type: 'string',
					},
				},
				summary: {
					'tExpense/km': {
						label: 'Total Expense/KM',
						type: 'number',
						key: 'tExpense/km',
						visible: true,
					},
					'tNetExpense': {
						label: 'Total Net Expense',
						type: 'number',
						key: 'tNetExpense',
						visible: true,
					},
					'tInternalFreight': {
						label: 'Total Internal Freight',
						type: 'number',
						key: 'tInternalFreight',
						visible: true,
					},
					'tProfit/day': {
						label: 'Total Profit/day',
						type: 'number',
						key: 'tProfit/day',
						visible: true,
					},
					'tProfit/km': {
						label: 'Total Profit/km',
						type: 'number',
						key: 'tProfit/km',
						visible: true,
					},
					'tRevenue/km': {
						label: 'Total Revenue/km',
						type: 'number',
						key: 'tRevenue/km',
						visible: true,
					},
					'tRtElapsed': {
						label: 'Total RtElapsed',
						type: 'number',
						key: 'tRtElapsed',
						visible: true,
					},
					'tTotalKM': {
						label: 'Total Round Trip KM',
						type: 'number',
						key: 'tTotalKM',
						visible: true,
					},
					'tTotal_advance': {
						label: 'Total Advance',
						type: 'number',
						key: 'tTotal_advance',
						visible: true,
					},
					'tTotal_actual_profit': {
						label: 'Total Actual Profit',
						type: 'number',
						key: 'tTotal_actual_profit',
						visible: true,
					},
					'tTotal_diesel': {
						label: 'Total Diesel',
						type: 'number',
						key: 'tTotal_diesel',
						visible: true,
					}
				},
				api: {
					'name': 'rtpExpenseNew'
				}
			},
			// END
			RTP: {
				filter: [
					{
						name: 'from'
					},
					{
						name: 'to'
					},
					{
						name: 'RT No'
					},
					{
						name: 'Segment Type'
					}
				],
				tableHeader: {
					RT_No: {
						name: 'RT No',
						key: '_id',
						type: 'number',
					},
					/*RT_Date: {
						name: 'RT Date',
						key: 'trips.slice(-1)[0].advSettled.date',
						type: '__date__',
					},*/
					Settlement_Date: {
						name: 'Settlement Date',
						key: 'trips.slice(-1)[0].markSettle.date',
						type: '__date__',
						date: 'dd-MMM-yyyy'
					},
					Vehicle_No: {
						name: 'Vehicle No',
						key: 'trips.slice(-1)[0].vehicle_no',
						type: 'string',
					},
					Driver: {
						name: 'Driver',
						key: 'trips.slice(-1)[0].driver.name',
						type: 'string',
					},
					Trip_Start: {
						name: 'RT Start',
						key: 'firstTripStart.date',
						type: '__date__',
						date: 'dd-MMM-yyyy'
					},
					Trip_End: {
						name: 'RT End',
						key: 'lastTripEnd.date',
						type: '__date__',
						date: 'dd-MMM-yyyy'
					},
					// Segment: {
					// 	name: 'Segment',
					// key: 'trips.slice(-1)[0].segment_type',
					// key: 'allSegments.join(", ")',
					// type: 'string',
					// },
					fleet: {
						name: 'Fleet',
						key: 'trips.slice(-1)[0].vehicle.owner_group',
						type: 'string',
					},
					// Vehicle_Type: {
					// 	name: 'Vehicle Type',
					// 	key: 'trips.slice(-1)[0].vehicle.veh_type_name',
					// 	type: 'string',
					// },
					Total_KM: {
						name: 'Total KM',
						key: 'totalKM',
						type: 'number',
					},
					Advance: {
						name: 'Advance',
						key: 'total_advance',
						type: 'number',
					},
					TT_days: {
						name: 'TT days',
						key: 'rtElapsed.toFixed(0)',
						type: 'string',
						date: false
					},
					Revenue: {
						name: 'Revenue',
						key: 'total_internal_freight',
						type: 'number',
					},
					Revenue_KM: {
						name: 'Revenue/KM',
						key: 'this["revenue/km"]',
						type: 'number',
						eval: true
					},
					Expense: {
						name: 'Expense',
						key: 'netExpense',
						type: 'number',
					},
					Expense_KM: {
						name: 'Expense/KM',
						key: 'this["expense/km"]',
						type: 'number',
						eval: true
					},
					Profit: {
						name: 'Profit',
						key: 'total_actual_profit',
						type: 'number',
					},
					Profit_KM: {
						name: 'Profit/KM',
						key: 'this["profit/km"]',
						type: 'number',
						eval: true
					},
					Profit_Day: {
						name: 'Profit/Day',
						key: 'this["profit/day"]',
						type: 'number',
						eval: true
					},
					diesel: {
						name: 'Diesel (Ltr.)',
						key: 'this["total_diesel"]',
						type: 'number',
						eval: true
					},
					Route: {
						name: 'Route',
						key: 'trips|arrayOfString:"route_name"',
						type: 'string',
					},
					Settlement_By: {
						name: 'Settlement By',
						key: 'trips.slice(-1)[0].markSettle.user_full_name',
						type: 'string',
					},
					Settlement_Remark: {
						name: 'Settlement Remark',
						key: 'trips.slice(-1)[0].markSettle.remark',
						type: 'string',
					},
					Audit_Date: {
						name: 'Audit Date',
						key: 'trips.slice(-1)[0].advSettled.creation.date',
						type: '__date__',
					},
					Audit_By: {
						name: 'Audit By',
						key: 'trips.slice(-1)[0].advSettled.creation.user',
						type: 'string',
					},
				},
				summary: {
					'tExpense/km': {
						label: 'Total Expense/KM',
						type: 'number',
						key: 'tExpense/km',
						visible: true,
					},
					'tNetExpense': {
						label: 'Total Net Expense',
						type: 'number',
						key: 'tNetExpense',
						visible: true,
					},
					'tInternalFreight': {
						label: 'Total Internal Freight',
						type: 'number',
						key: 'tInternalFreight',
						visible: true,
					},
					'tProfit/day': {
						label: 'Total Profit/day',
						type: 'number',
						key: 'tProfit/day',
						visible: true,
					},
					'tProfit/km': {
						label: 'Total Profit/km',
						type: 'number',
						key: 'tProfit/km',
						visible: true,
					},
					'tRevenue/km': {
						label: 'Total Revenue/km',
						type: 'number',
						key: 'tRevenue/km',
						visible: true,
					},
					'tRtElapsed': {
						label: 'Total RtElapsed',
						type: 'number',
						key: 'tRtElapsed',
						visible: true,
					},
					'tTotalKM': {
						label: 'Total Round Trip KM',
						type: 'number',
						key: 'tTotalKM',
						visible: true,
					},
					'tTotal_advance': {
						label: 'Total Advance',
						type: 'number',
						key: 'tTotal_advance',
						visible: true,
					},
					'tTotal_actual_profit': {
						label: 'Total Actual Profit',
						type: 'number',
						key: 'tTotal_actual_profit',
						visible: true,
					},
					'tTotal_diesel': {
						label: 'Total Diesel',
						type: 'number',
						key: 'tTotal_diesel',
						visible: true,
					}
				},
				api: {
					'name': 'getReport'
				}
			},
			'RTP New': {
				filter: [],
				tableHeader: {},
				summary: {},
				api: {
					'name': 'RTPRNew'
				}
			},
			'Detail RTP': {
				filter: [
					{
						name: 'from'
					},
					{
						name: 'to'
					},
					{
						name: 'RT No'
					},
					{
						name: 'Segment Type'
					}
				],
				tableHeader: {
					RT_No: {
						name: 'RT No',
						key: '_id',
						type: 'number',
					},
					/*RT_Date: {
						name: 'RT Date',
						key: 'trips.slice(-1)[0].advSettled.date',
						type: '__date__',
					},*/
					Settlement_Date: {
						name: 'Settlement Date',
						key: 'trips.slice(-1)[0].markSettle.date',
						type: '__date__',
					},
					Settlement_By: {
						name: 'Settlement By',
						key: 'trips.slice(-1)[0].markSettle.user_full_name',
						type: 'string',
					},
					Settlement_Remark: {
						name: 'Settlement Remark',
						key: 'trips.slice(-1)[0].markSettle.remark',
						type: 'string',
					},
					Audit_Date: {
						name: 'Audit Date',
						key: 'trips.slice(-1)[0].advSettled.creation.date',
						type: '__date__',
					},
					Audit_By: {
						name: 'Audit By',
						key: 'trips.slice(-1)[0].advSettled.creation.user',
						type: 'string',
					},
					Vehicle_No: {
						name: 'Vehicle No',
						key: 'trips.slice(-1)[0].vehicle_no',
						type: 'string',
					},
					Driver: {
						name: 'Driver',
						key: 'trips.slice(-1)[0].driver.name',
						type: 'string',
					},
					Trip_Start: {
						name: 'RT Start',
						key: 'firstTripStart.date',
						type: '__date__',
					},
					Trip_End: {
						name: 'RT End',
						key: 'lastTripEnd.date',
						type: '__date__',
					},
					Segment: {
						name: 'Segment',
						// key: 'trips.slice(-1)[0].segment_type',
						key: 'allSegments.join(", ")',
						type: 'string',
					},
					Vehicle_Type: {
						name: 'Vehicle Type',
						key: 'trips.slice(-1)[0].vehicle.veh_type_name',
						type: 'string',
					},
					Total_KM: {
						name: 'Total KM',
						key: 'totalKM',
						type: 'number',
					},
					Advance: {
						name: 'Advance',
						key: 'total_advance',
						type: 'number',
					},
					TT_days: {
						name: 'TT days',
						key: 'rtElapsed.toFixed(0)',
						type: 'string',
						date: false
					},
					Revenue: {
						name: 'Revenue',
						key: 'total_internal_freight',
						type: 'number',
					},
					Revenue_KM: {
						name: 'Revenue/KM',
						key: 'this["revenue/km"]',
						type: 'number',
						eval: true
					},
					Expense: {
						name: 'Expense',
						key: 'netExpense',
						type: 'number',
					},
					Expense_KM: {
						name: 'Expense/KM',
						key: 'this["expense/km"]',
						type: 'number',
						eval: true
					},
					Profit: {
						name: 'Profit',
						key: 'total_actual_profit',
						type: 'number',
					},
					Profit_KM: {
						name: 'Profit/KM',
						key: 'this["profit/km"]',
						type: 'number',
						eval: true
					},
					Profit_Day: {
						name: 'Profit/Day',
						key: 'this["profit/day"]',
						type: 'number',
						eval: true
					},
					diesel: {
						name: 'Diesel (Ltr.)',
						key: 'this["total_diesel"]',
						type: 'number',
						eval: true
					},
					Route: {
						name: 'Route',
						key: 'trips|arrayOfString:"route_name"',
						type: 'string',
					},
				},
				summary: {
					'tExpense/km': {
						label: 'Total Expense/KM',
						type: 'number',
						key: 'tExpense/km',
						visible: true,
					},
					'tNetExpense': {
						label: 'Total Net Expense',
						type: 'number',
						key: 'tNetExpense',
						visible: true,
					},
					'tInternalFreight': {
						label: 'Total Internal Freight',
						type: 'number',
						key: 'tInternalFreight',
						visible: true,
					},
					'tProfit/day': {
						label: 'Total Profit/day',
						type: 'number',
						key: 'tProfit/day',
						visible: true,
					},
					'tProfit/km': {
						label: 'Total Profit/km',
						type: 'number',
						key: 'tProfit/km',
						visible: true,
					},
					'tRevenue/km': {
						label: 'Total Revenue/km',
						type: 'number',
						key: 'tRevenue/km',
						visible: true,
					},
					'tRtElapsed': {
						label: 'Total RtElapsed',
						type: 'number',
						key: 'tRtElapsed',
						visible: true,
					},
					'tTotalKM': {
						label: 'Total Round Trip KM',
						type: 'number',
						key: 'tTotalKM',
						visible: true,
					},
					'tTotal_advance': {
						label: 'Total Advance',
						type: 'number',
						key: 'tTotal_advance',
						visible: true,
					},
					'tTotal_actual_profit': {
						label: 'Total Actual Profit',
						type: 'number',
						key: 'tTotal_actual_profit',
						visible: true,
					},
					'tTotal_diesel': {
						label: 'Total Diesel',
						type: 'number',
						key: 'tTotal_diesel',
						visible: true,
					}
				},
				api: {
					'name': 'getReport'
				}
			},
			'RTP Gap': {
				api: {
					'name': 'rtpGapReport'
				}
			},
			'Last Settle RTP': {
				api: {
					'name': 'lastSettleRtpr'
				}
			},
			'Last Settle RT Report': {
				api: {
					'name': 'lastSettleRtReport'
				}
			},
			'Monthly Performance': {
				api: {
					'name': 'vehMonthlyPerformanceRpt'
				}
			},
		},

		maxAdvanceDieselAmount: 70000,

		totalKM: 200,
		addKMlimit: 1000,

		aCoastingReportTypes: [{
			'name': 'Vendor Reconciliation',
			'path': 'views/report/vendorReconcilationReport.html'
		}, {
			'name': 'Trip Expense',
			'path': 'views/report/tripExpenseReport.html'
		}, {
			'name': 'Fuel Vendor Reconciliation',
			'path': 'views/report/fuelVendorReconciliationReport.html'
		}],

		aGrType: [
			{
				name: 'Manual Builty',
				_id: "Own"
			}],
		/*{
            name: 'Market Builty',
            _id: "Market"
        },
        {
            name: 'Centralized Builty',
            _id: "Centralized"
        }*/
		advanceAmount: 250000,

		grFreight: 500000,
		tripExpenseAmt: 100000,
		gstinLength: 15,

		aFeature : [
			'Diesel',
			'Driver Cash',
			'Happay',
			'Fastag',
			'Bill',
			'Money Receipt',
			'Shortage',
			'Challan',
			'Staff',
			'Loan',
			'Late Delivery',
			'Damages',
			'Shortage',
			'Claim',
			'Non-Placement',
			'Parking',
			'Loading/Unloading',
			'ESI/PF',
			'GPS Recovery',
			'Insurance',
			'Rate Difference',
			'Misc Recovery',
			'Detention',
			'Deduction',
			'Office',
			'Lorry ',
			'Other'

		],


		customerTypes: ["Customer", "Consignee", "Consignor", "Billing party", "CHA", "Transporter", "Gps user", "Dealer", "Others"],

		customerStatus: ["Active", "Inactive"],

		aVendorCategory: ["Owner", "Broker"],

		companyTypes: ["Public Limited", "Private", "Group"],

		aVehicleStatus: ["Available", "Maintenance", "Booked", "Journey"],

		aBPGroup: ["Freight Corporation", "Fleet Carrier", "Export", "Misc. Fleet", "ToPay Freight"],

		aVehicleProvider: ['Own', 'Associate', 'Market'],

    	contractType: ["Temporary", "Permanent"],

		contractStatus: ["Not started", "Live", "Completed"],

		paymentType:["To pay", "To be billed", "Advance & to pay", "Advance & to be billed", "Chit", "Advance & chit", "FOC"],

		paymentBasis:["Fixed", "PUnit"],

		billingType: ["BOE wise", "Trip wise", "Contract wise", "Monthly", "Weekly", "Bi-Weekly"],

		emailFrequency: ["BOE wise", "Trip wise", "Contract wise", "Monthly", "Weekly", "Bi-Weekly"],

		aOwnershipVehicle: ["Own", "Associate", "Market", "Sold"],

		aOwnershipVendor: ["Associate", "Market"],

		aStationeryCategory: ['Bill', 'GR', 'Cash Receipt'],

		aBillBookType: ['Bill', 'Gr', 'FPA', 'Hire Slip', 'Ref No', 'Cash Receipt', 'Money Receipt', 'Credit Note', 'Trip Memo','Debit Note'],

		abillStatus: ["Unapproved", "Approved", "Cancelled", "Dispatched", "Acknowledged"],

		aGrStatuses: ["GR Not Assigned", "GR Assigned", "Vehicle Arrived for loading", "Loading Started", "Loading Ended","Departure", "Vehicle Arrived for unloading", "Unloading Started", "Unloading Ended", "Trip cancelled", "GR Received", "GR Acknowledged"],

		// customer type for master -> add customer
		aCustomerType: ["Customer", "Consignee", "Consignor", "Billing party", "CHA", "Transporter", "Others"],

		aTripStatus: [
			{label: "Trip not started", key: "Trip not started"},
			{label: "Trip started", key: "Trip started"},
			{label: "Trip ended", key: "Trip ended"},
			{label: "Trip cancelled", key: "Trip cancelled"}
		],

		aTripCategoryType: ['Loaded', 'Empty'],

		aPayType: ['Gr Charges', 'Loading Charges', 'Unloading Charges', 'Other Charges',
			'Chalan', 'Driver Cash', 'Diesel', 'Extra Diesel', 'Toll Tax', 'Vendor A/C Pay', 'Vendor Cash',
			'Vendor Cheque', 'Vendor Detention', "Vendor Overload Charges", 'Vendor Penalty', 'Vendor Damage', 'Vendor Chalan', "Happay", "FastTag"],

		aAdvanceType: ['Gr Charges', 'Loading Charges', 'Unloading Charges', 'Other Charges', 'Chalan', 'Driver Cash', 'Diesel', 'Extra Diesel', 'Toll Tax', 'Happay', 'FastTag'],
		// c - > category of payment ,n-> normal,d-> deduction,e->extra

		aTripDocType: [{
			key: 'Loading Slip/Chalan',
			value: "chalan"
		}, {
			key: 'DL',
			value: "dl"
		}, {
			key: 'Fitness',
			value: "fitness"
		}, {
			key: 'Insurance',
			value: "insurance"
		}, {
			key: 'Misc',
			value: "misc"
		}, {
			key: 'Permit',
			value: "permit"
		}, {
			key: 'RC',
			value: "rc"
		}],

		aGrDocType: [{
			key: 'Pod Back',
			value: "back"
		}, {
			key: 'Eway Bill',
			value: "eway"
		}, {
			key: 'Pod Front',
			value: "front"
		}, {
			key: 'Gr Back',
			value: "grBack"
		}, {
			key: 'Gr Front',
			value: "grFront"
		}, {
			key: 'Goods Insurance',
			value: "insur"
		}, {
			key: 'Invoice',
			value: "invoice"
		}, {
			key: 'Misc',
			value: "misc"
		}],

		tripDateType: [
			{
				key: "Trip start",
				value: "Trip started"
			},
			{
				key: "Trip end",
				value: "Trip ended"
			},
			{
				key: "Deal/Chalan",
				value: "vendorDeal.deal_at"
			},
			{
				key: "Deal/Chalan Entry",
				value: "vendorDeal.entryDate"
			},
			/*{
				key: "Loading Date",
				value: "loading_date"
			},
			{
				key: "Unloading Date",
				value: "unloading_date"
			},*/
			{
				key: "Trip Entry",
				value: "allocation_date"
			},
			{
				key: "Acknowledge Date",
				value: "vendorDeal.acknowledge.date"
			}
		],

		advanceDateType: [
			{
				key: "Advance Entry",
				value: "created_at"
			}
		],

		aCharges: [
			{
				name: 'Detention Charges',
				value: 'detention_charge',
				tds: true,
				a1: '$vendor',
				a2: 'Purchase'
			},
			{
				name: 'Overload Charges',
				value: 'oveloading_charge',
				a1: '$vendor',
				a2: 'Purchase'
			},
			{
				name: 'Loading Charges',
				value: 'loading_charges',
				tds: true,
				a1: '$vendor',
				a2: 'Purchase'
			},
			{
				name: 'Unloading Charges',
				value: 'unloading_charges',
				a1: '$vendor',
				a2: 'Purchase'
			},
			{
				name: 'Other Charges',
				value: 'other_charges',
				a1: '$vendor',
				a2: 'Purchase'
			},
			{
				name: 'Chalan Charges',
				value: 'chalan_charges',
				a1: '$vendor',
				a2: 'Purchase'
			},
			{
				name: 'Chalan Charges RTO',
				value: 'chalan_rto_charges',
				a1: '$vendor',
				a2: 'Purchase'
			},
			{
				name: 'Tirpal Charges',
				value: 'tirpal_charges',
				a1: '$vendor',
				a2: 'Purchase'
			},
			{
				name: 'Toll Charges',
				value: 'toll_charges',
				a1: '$vendor',
				a2: 'Purchase'
			},
			{
				name: 'Extra weight',
				value: 'extra_weight',
				a1: '$vendor',
				a2: 'Purchase'
			}
		],

		aDeductionCharges: [
			{
				name: 'Damage',
				value: 'damage_deduction',
				a1: 'Deduction',
				a2: '$vendor'
			},
			{
				name: 'Penalty',
				value: 'penalty_deduction',
				a1: 'Deduction',
				a2: '$vendor'
			},
			{
				name: 'Labour',
				value: 'labourDeduction',
				a1: 'Deduction',
				a2: '$vendor'
			},
			{
				name: 'Claim',
				value: 'claimDeduction',
				a1: 'Deduction',
				a2: '$vendor'
			},
			{
				name: 'Advance Payment Munshiyana',
				value: 'Adv_Paymt_Munshiyana',
				a1: 'Deduction',
				a2: '$vendor'
			},
			{
				name: 'Balance Payment Munshiyana',
				value: 'Bal_Paymt_Munshiyana',
				a1: 'Deduction',
				a2: '$vendor'
			},
			{
				name: 'Other',
				value: 'other_deduction',
				a1: 'Deduction',
				a2: '$vendor'
			}
		],

		expenseObj2: [
			{
				name: 'Driver Cash',
				a1: ['Transaction', 'banks', 'Cashbook'],
				a2: ['$vehicle', '$vendor'],
				a3: null,
				c: 'n',
				oType: 'Associate'
			},
			{
				name: 'Diesel',
				a1: '$fvendor',
				a2: ['$vehicle', '$vendor'],
				a3: null,
				c: 'n'
			},
			/*{
				name: 'Vendor Advance',
				a1: ['Transaction', 'banks', 'Cashbook'],
				a2: '$vendor',
				a3: null,
				c: 'n'
			},
			{
				name: 'Vendor Diesel',
				a1: ['Transaction', 'banks', 'Cashbook'],
				a2: '$vendor',
				a3: null,
				c: 'n'
			},
			{
				name: "Vendor Balance",
				a1: ['Transaction', 'banks', 'Cashbook'],
				a2: '$vendor',
				a3: null,
				c: 'n'
			},*/
			{
				name: "Happay",
				a1: 'Happay Master',
				a2: ['$vehicle', '$vendor', 'Cashbook'],
				a3: null,
				c: 'n'
			},
			{
				name: "Fastag",
				a1: 'FastTag Master',
				a2: ['$vehicle', '$vendor', 'Cashbook'],
				a3: null,
				c: 'n'
			},
			{
				name: "TDS",
				a1: 'TDS Master',
				a2: '$vendor',
				a3: null,
				c: 'd',
				v: 'Journal'
			},
			{
				name: "Damage",
				a1: 'Damage Master',
				a2: '$vendor',
				a3: null,
				c: 'd'
			},
			{
				name: "Penalty",
				a1: 'Penalty Master',
				a2: '$vendor',
				a3: null,
				c: 'd'
			}
		],

		expenseObj: [
			{
				name: 'Driver Cash',
				a1: ['Transaction', 'banks', 'Cashbook', 'Diesel'],
				a2: ['$vehicle', '$vendor'],
				a3: null,
				c: 'n',
				oType: 'Associate'
			},
			{
				name: 'Diesel',
				a1: '$fvendor',
				a2: ['$vehicle', '$vendor'],
				a3: null,
				c: 'n'
			},
			{
				name: 'Vendor Advance',
				a1: ['Transaction', 'banks', 'Cashbook'],
				a2: '$vendor',
				a3: null,
				c: 'n'
			},
			{
				name: 'Vendor Diesel',
				a1: ['Transaction', 'banks', 'Cashbook'],
				a2: '$vendor',
				a3: null,
				c: 'n'
			},
			{
				name: "Vendor Balance",
				a1: ['Transaction', 'banks', 'Cashbook'],
				a2: '$vendor',
				a3: null,
				c: 'n'
			},
			{
				name: "Happay",
				a1: 'Happay Master',
				a2: ['$vehicle', '$vendor', 'Cashbook'],
				a3: null,
				c: 'n'
			},
			{
				name: "Fastag",
				a1: 'FastTag Master',
				a2: ['$vehicle', '$vendor', 'Cashbook'],
				a3: null,
				c: 'n',
			},
			{
				name: "TDS",
				a1: 'TDS Master',
				a2: '$vendor',
				a3: null,
				c: 'd',
				v: 'Journal'
			},
			{
				name: "Damage",
				a1: 'Damage Master',
				a2: '$vendor',
				a3: null,
				c: 'd'
			},
			{
				name: "Penalty",
				a1: 'Penalty Master',
				a2: '$vendor',
				a3: null,
				c: 'd',
			}
		],

		"aDriverPaymentType" : [
			{
				"pType" : "Driver Payment",
				"voucherType" : [
					"Payment"
				],
				"fromGroup" : [
					"Internal Cashbook"
				],
				"toGroup" : [
					"Driver"
				]
			},
			{
				"pType" : "Driver to Driver",
				"voucherType" : [
					"Journal",
					"Contra"
				],
				"fromGroup" : [
					"Driver"
				],
				"toGroup" : [
					"Driver"
				]
			},
			{
				"pType" : "Driver Repay",
				"voucherType" : [
					"Journal",
					"Contra"
				],
				"fromGroup" : [
					"Driver"
				],
				"toGroup" : [
					"Internal Cashbook"
				]
			},
			{
				"pType" : "Shortage",
				"voucherType" : [
					"Payment"
				],
				"fromGroup" : [
					"Internal Cashbook"
				],
				"toGroup" : [
					"Driver"
				]
			},
			{
				"pType" : "Challan",
				"voucherType" : [
					"Payment"
				],
				"fromGroup" : [
					"Internal Cashbook"
				],
				"toGroup" : [
					"Driver"
				]
			},

		],

		aOtherExpense: [
			{
				name: 'Generator',
				a1: '$fvendor',
				a2: 'Generator',
				a3: null
			},
			{
				name: 'Car',
				a1: '$fvendor',
				a2: 'Car',
				a3: null
			},
			{
				name: 'Market',
				a1: '$fvendor',
				a2: 'Generator',
				a3: null
			}
		],

		aPaymentType: [
			{
				pType: 'Driver Payment',
				fromGroup: ['Internal Cashbook'],
				toGroup: ['Driver'],
				voucherGroup: ['Journal'],
			},
			{
				pType: 'Driver to Driver',
				fromGroup: ['Driver'],
				toGroup: ['Driver'],
				voucherGroup: ['Journal'],
			}
		],
		previewBuilty: [
			{
				key: "DGD_Daramic",
				name: "Daramic"
			}
		],
		aPaymentTypeComplete: [
			{
				pType: "Trip Memo Receipt",
				voucherType: ["Receipt"],
			}
			,
			{
				pType: "Other",
				voucherType: ["Journal", "Payment", "Contra", "Receipt"],
			},
			{
				pType: "Customer Receipts",
				fromGroup: ['Customer'],
				toGroup: ['banks', 'cashbook', 'Transaction'],
				voucherType: ['Journal', 'Receipt'],
			},
			{
				pType: "Purchase Discount",
				voucherType: ["Journal", "Payment", "Contra", "Receipt"],
			},
			{
				pType: "Diesel Bill",
				voucherType: ["Journal", "Payment", "Contra", "Receipt"],
			},
			{
				pType: "FPA",
				voucherType: ["Journal"],
			},
			{
				pType: "Vendor Advance",
				voucherType: ["Journal", "Payment", "Contra", "Receipt"],
			},
			{
				pType: "Diesel",
				voucherType: ["Journal", "Payment", "Contra", "Receipt"],
			},
			{
				pType: "Maintenance",
				voucherType: ["Journal", "Payment", "Contra", "Receipt"],
			},
			{
				pType: "Spare Parts",
				voucherType: ["Journal", "Payment", "Contra", "Receipt"],
			},
			{
				pType: "Tyre",
				voucherType: ["Journal", "Payment", "Contra", "Receipt"],
			},
			{
				pType: "Vendor Deal",
				voucherType: ["Journal", "Payment", "Contra", "Receipt"],
			},
			{
				pType: "Vendor TDS",
				voucherType: ["Journal", "Payment", "Contra", "Receipt"],
			},
			{
				pType: "Vendor Charges",
				voucherType: ["Journal", "Payment", "Contra", "Receipt"],
			},
			{
				pType: "Vendor Deduction",
				voucherType: ["Journal", "Payment", "Contra", "Receipt"],
			},
			{
				pType: "Gr Bill",
				voucherType: [],
			},
			{
				pType: "Happay",
				voucherType: [],
			},
			{
				pType: "Fastag",
				voucherType: [],
			},
			{
				pType: "Driver Cash",
				voucherType: [],
			},
			{
				pType: "Driver Payment",
				voucherType: [],
			},
			{
				pType: "Driver to Driver",
				voucherType: [],
			},
			{
				pType: "Driver Repay",
				voucherType: [],
			},
			{
				pType: "Diesel",
				voucherType: [],
			},
			{
				pType: "Advance Udpate",
				voucherType: [],
			},
			{
				pType: "Money Receipt",
				voucherType: [],
			},
			{
				pType: "Credit Note",
				voucherType: [],
			},
			{
				pType: "Debit Note",
				voucherType: [],
			},
			{
				pType: "Fitness Worksheet",
				voucherType: [],
			},
			{
				pType: "Good and Token Tax",
				voucherType: [],
			},
			{
				pType: "Insurance",
				voucherType: [],
			},
			{
				pType: "Permit",
				voucherType: [],
			},
			{
				pType: "Sale Deed",
				voucherType: [],
			},
			{
				pType: "Dr Expense",
				voucherType: [],
			},
			{
				pType: "Dr driverCash",
				voucherType: [],
			},
			{
				pType: "Dr diesel",
				voucherType: [],
			},
			{
				pType: "Dr fastag",
				voucherType: [],
			},
			{
				pType: "Dr happay",
				voucherType: [],
			},
			{
				pType: "Vehicle Expense",
				voucherType: [],
			},
			//'FPA'
		],

		aVoucherPaymentType: [
			{
				pType: "Customer Receipts",
				fromGroup: ['Customer'],
				toGroup: ['banks', 'cashbook', 'Transaction'],
				voucherType: ['Journal', 'Receipt'],
			},
			{
				pType: "Other",
				voucherType: ["Journal", "Payment", "Contra", "Receipt"],
			}
		],

		deductionObj: [
			{
				name: 'Late Delivery',
				type: 'credit'
			},
			{
				name: 'Damages',
				type: 'credit'
			},
			{
				name: 'Shortage',
				type: 'debit'
			},
			{
				name: 'Claim',
				type: 'debit'
			},
			{
				name: 'Non-Placement',
				type: 'credit'
			},
			{
				name: 'Parking',
				type: 'debit'
			},
			{
				name: 'Loading/Unloading',
				type: 'credit'
			},
			{
				name: 'ESI/PF',
				type: 'debit'
			},
			{
				name: 'GPS Recovery',
				type: 'debit'
			},
			{
				name: 'Insurance',
				type: 'debit'
			},
			{
				name: 'Rate Difference',
				type: 'credit'
			},
			{
				name: 'Misc Recovery',
				type: 'debit'
			},
			{
				name: 'Detention',
				type: 'credit'
			},
			{
				name: 'Deduction',
				type: 'credit'
			}

		],

		miscDeductionObj: [
			{
				name: 'Security Recovery',
				value: 'security_recovery',
				type: 'debit'
			},

			{
				name: 'Trucking Charges',
				value: 'trucking_charges',
				type: 'debit'
			},

			{
				name: 'Parking Charges',
				value: 'parking_charges',
				type: 'debit'
			},

			{
				name: 'Employer Contribution - PF',
				value: 'employer_PF',
				type: 'debit'
			},
			{
				name: 'Employer Contribution ESI',
				value: 'employer_ESI',
				type: 'debit'
			},
			{
				name: 'Penalty',
				value: 'penalty',
				type: 'credit'
			},

			{
				name: 'Insurance Charges for goods Intransit',
				value: 'insurance_charges',
				type: 'debit'
			},
			{
				name: 'Loading & Unloading Charges',
				value: 'loadUnloading_charges',
				type: 'credit'
			},
			{
				name: 'Non Placement Charges',
				value: 'nonplacement_charges',
				type: 'credit'
			},
			{
				name: 'Misc Recovery',
				value: 'misc_recovery',
				type: 'debit'
			},
			{
				name: 'Detention charges',
				value: 'detention_charges',
				type: 'debit'
			}

		],

		settlementObj: [
			{
				name: 'Border',
			},
			{
				name: 'Challan',
			},
			{
				name: 'Dala Commision',
			},
			{
				name: 'Diesel',
			},
			{
				name: 'Fixed + Salary',
			},
			{
				name: 'OK + Time',
			},
			{
				name: 'Parking',
			},
			{
				name: 'Rajai',
			},
			{
				name: 'Repair',
			},
			{
				name: 'Roti',
			},
			{
				name: 'Service',
			},
			{
				name: 'Extra',
			},
			{
				name: 'Miscellaneous Pending',
			},
			{
				name: 'Fastag Toll Tax',
			},
			{
				name: 'Cash Toll Tax',
			},
			{
				name: 'Wages'
			},
			{
				name: 'Local Trip'
			},
			{
				name: 'Add Blue'
			},
			{
				name: 'Phone Expense'
			},
			{
				name: 'Consumable store'
			},
			{
				name: 'Loading'
			},
			{
				name: ' Unloading '
			},
			{
				name: ' Def'
			},
			{
				name: ' Tyre Puncture'
			},
			{
				name: ' Tripal'
			}
		],

		vendorTypes: ['Vendor A/C Pay', 'Vendor Cash', 'Vendor Cheque', 'Vendor Detention', "Vendor Overload Charges", 'Vendor Penalty', 'Vendor Damage', 'Vendor Chalan'],
		expenseDateType: [{
			key: "Allocation Date",
			value: "allocation_date"
		}, {
			key: "Expense Date",
			value: "date"
		}, {
			key: "Expense Entry Date",
			value: "created_at"
		}, {
			key: "POD Receiving",
			value: "trip.aGR.acknowledge.systemDate"
		}, {
			key: "Advance Due Date",
			value: "vendorDeal.advance_due_date"
		}, {
			key: "To pay Due Date",
			value: "vendorDeal.topay_due_date"
		}, {
			key: "Ask Payment",
			value: "askPayment.date"
		}, {
			key: "LS Upload Date",
			value: "vendorDeal.ls_uploading_date"
		}
		],
		expensePaymentStatus: ["All", "Pending", "Partial Paid", "Paid", "Over Paid"],

		aGRstate: ["GR Not Assigned", "GR Assigned", "Vehicle Arrived for loading", "Loading Started", "Loading Ended", "Vehicle Arrived for unloading", "Unloading Started", "Unloading Ended", "Trip cancelled", "GR Received", "GR Acknowledged"],

		liveTrackStatus: ["Running", "Stopped", "In Traffic"],

		cargoType: ["Import - Containerized", "Export - Containerized", "Domestic - Containerized", "Import - Loose Cargo", "Export - Loose Cargo", "Domestic - Loose Cargo", "Empty - Containerized", "Empty - Vehicle", "Transporter Booking"],

		aBookingTypes: ["Domestic - Loose Cargo", "Import - Containerized", "Export - Containerized", "Domestic - Containerized", "Import - Loose Cargo", "Export - Loose Cargo", "Empty - Containerized", "Empty - Vehicle", "Transporter Booking"],

		aSegmentType: ['Default'],

		aCreditNoteType: ['Full', 'Full(Gr Reversal)', 'Partial'],

		aReportTypes: ["Profitability Report - Date Wise",
			"Profitability Report - Vehicle Wise",
			"Profitabilty Report - Customer Wise",
			"Trips - Date Wise",
			"Trips - Vehicle Wise",
			"Trips - Driver Wise",
			"Bills - Trip Wise",
			// "Bills - Driver Wise"
		],
		aBookingReportTypes: [
			/*"Booking Number",
            "Booking Type Wise",
            "Booking Date Wise",
            "Customer Wise",
            "Branch Wise"*/
			{key: 'booking_no', value: 'Booking Number'},
			{key: 'booking_type', value: 'Booking Type Wise'},
			{key: 'created_at', value: 'Booking Date Wise'},
			{key: 'customer', value: 'Customer Wise'},
			{key: 'branch_id', value: 'Branch Wise'},
		],
		aGrReportTypes: [
			/*"Booking Number",
            "Booking Type Wise",
            "Booking Date Wise",
            "Customer Wise",
            "Branch Wise"*/
			//{key: 'status', value: 'Status Wise'},
			//{key: 'grDate', value: 'Gr Date Wise'},
			//{key: 'BilledRpt', value: 'Billed Monthly Report'},
			{key: 'UnbilledRpt', value: 'Unbilled Monthly Report'},
			{key: 'UnbilledSumm', value: 'Unbilled Summary Report'},
			{key: 'LoadingRpt', value: 'Loading Monthly Report'},
			{key: 'grReportCron', value: 'Unbilled grs as on date'},
		],
		regVehPattern: "[A-Z]{2}[0-9]{1,}[A-z]{0,}[0-9]{4}",
		aBillStatus: [
			{key: 'pending', value: 'Unbilled'},
			{key: 'approved', value: 'Approved'},
			{key: 'billed', value: 'Billed'},
			{key: 'dispatched', value: 'Dispatched'},
		],
		aBillReportTypes: [
			/*"Booking Number",
            "Booking Type Wise",
            "Booking Date Wise",
            "Customer Wise",
            "Branch Wise"*/
			{key: 'billNo', value: 'Billing Number'},
			{key: 'billDate', value: 'Bill Date'},
			{key: 'dueDate', value: 'Due Date'},
			{key: 'status', value: 'Status '},
			{key: 'billingParty', value: 'Billing Party'},
			{key: 'type', value: 'Bill Type'},


		],
		aBillingRegister: [
			{key: 'all', value: 'All'},
			{key: 'billed', value: 'Billed'},
			{key: 'approved', value: 'Approved'},
			{key: 'dispatched', value: 'Dispatched'},

		],
		aJobCardReportTypes: [
			{key: 'vehicle_number', value: 'Vehicle Number Wise'},
			{key: 'jobId', value: 'Job Id Wise'},
			{key: 'job_type', value: 'Job Type Wise'},
			{key: 'maintenance_type', value: 'Maintenance Type Wise'},
			{key: 'flag', value: 'Flag Wise'},
			{key: 'vehicle_category', value: 'Vehicle Category Wise'},
			{key: 'status', value: 'Status Wise'}
		],
		aSpareConReportType: [
			{key: 'vehicle_number', value: 'Vehicle Number Wise'},
			{key: 'jobId', value: 'Job Id Wise'},
			{key: 'job_type', value: 'Job Type Wise'},
			{key: 'flag', value: 'Flag Wise'},
		],
		aJobCardTaskReportTypes: [
			{key: 'taskId', value: 'Task Id Wise'},
			{key: 'task_name', value: 'Task Name Wise'},
			{key: 'jobId', value: 'Job Id Wise'},
			{key: 'status', value: 'Status Wise'},
			{key: 'supervisor_name', value: 'Supervisor Wise'},
			{key: 'priority', value: 'Priority Wise'}
		],
		aToolReportTypes: [
			{key: 'spare_name', value: 'Tool Name Wise'},
			{key: 'status', value: 'Status Wise'},
			{key: 'invoice_number', value: 'Invoice Number Wise'},
			{key: 'category', value: 'Category Wise'},
			{key: 'vendor_name', value: 'Vendor Wise'}
		],
		aToolIssueReportTypes: [
			{key: 'tool_code', value: 'Tool Code Wise'},
			{key: 'vehicle_number', value: 'Vehicle Number Wise'},
			{key: 'issue_to_employee_name', value: 'Driver Wise'},
			{key: 'issue_to_employee_name', value: 'Mechanic Wise'},
			{key: 'issue_to_employee_name', value: 'Contractor Wise'},
			{key: 'toolId', value: 'Tool Id Wise'}
		],
		aTyreReportTypes: [
			{key: 'tyre_category', value: 'Tyre Category Wise'},
			{key: 'status', value: 'Status Wise'},
			{key: 'vendor_name', value: 'Vendor Wise'},
			{key: 'po_number', value: 'PO Wise'}
		],
		aTyreIssueReportTypes: [
			{key: 'tyre_number', value: 'Tyre Number Wise'},
			{key: 'jobVehicle', value: 'Vehicle Wise'},
			{key: 'structure_name', value: 'Structure Wise'},
			{key: 'jobId', value: 'Job Id Wise'}
		],
		aPRreportTypes: [
			{key: 'tyre_number', value: 'Tyre Number Wise'},
			{key: 'vehicle_no', value: 'Vehicle Wise'},
			{key: 'structure_name', value: 'Structure Wise'},
			{key: 'jobId', value: 'Job Id Wise'}
		],
		aTyreRetReportTypes: [
			{key: 'tyre_number', value: 'Tyre Number Wise'},
			{key: 'vendor_name', value: 'Vendor Wise'},
			{key: 'bill_no', value: 'Bill No. Wise'},
			{key: 'issue_slip_no', value: 'Issue Slip Wise'}
		],
		aPrimeTrailerAssoReportTypes: [
			{key: 'trailer_no', value: 'Trailer No. Wise'},
			{key: 'vehicle_reg_no', value: 'Vehicle Wise'},
			{key: 'associated_by_employee_name', value: 'Employee Name Wise'}
		],
		aBillDispatchReportTypes: [
			"Invoice Wise",
			"Customer Wise",
			"Vehicle Wise",
			"Bill Number Wise",
			"Billing Party Wise",
			"Dispatch Date Wise"
		],
		aContractorExpenseReportTypes: [
			{key: 'jobId', value: 'Job Id Wise'},
			{key: 'taskId', value: 'Task Id Wise'},
			{key: 'task_name', value: 'Task Name Wise'},
			{key: 'vehicle_number', value: 'Vehicle No. Wise'},
			{key: 'contractor_name', value: 'Contractor Wise'},
			{key: 'supervisor_name', value: 'Supervisor Wise'}
		],
		aExpenseReportTypes: [
			{key: 'type', value: 'Type Wise'},
			{key: 'jobId', value: 'Job Id Wise'},
			{key: 'vehicle_no', value: 'Vehicle No. Wise'},
			{key: 'expense_no', value: 'Expense No. Wise'},
			{key: 'bill_no', value: 'Bill No. Wise'}
		],
		aDateType: [
			{key: 'bill_date', value: 'Bill Date'},
			{key: 'created_at', value: 'Created Date'}
		],
		//aBookingTypes : ["Domestic - Loose Cargo"],
		aContainerTypes: ["20 Feet", "40 Feet"],
		aWeightTypes: ["Fixed", "PMT", "PUnit", /*"Percentage"*/],
		aWeightUnits: ["MTonne", "Tonne", "Kilogram"],
		aLocationType: ["Loading", "Toll", "Unloading"],
		bookingTypes: {
			import_container: 'Import - Containerized',
			export_container: 'Export - Containerized',
			domestic_container: 'Domestic - Containerized',
			import_cargo: 'Import - Loose Cargo',
			export_cargo: 'Export - Loose Cargo',
			domestic_cargo: 'Domestic - Loose Cargo',
			empty_container: 'Empty - Containerized',
			empty_vehicle: 'Empty - Vehicle',
			//transporter: 'Transporter Booking'
		},

		aGSTstates: [
			{"state": "Jammu and Kashmir", "first_two_txn": "01", "state_code": "JK", "zone": "North"},
			{"state": "Himachal Pradesh", "first_two_txn": "02", "state_code": "HP", "zone": "North"},
			{"state": "Punjab", "first_two_txn": "03", "state_code": "PB", "zone": "North"},
			{"state": "Chandigarh", "first_two_txn": "04", "state_code": "CH", "zone": "North"},
			{"state": "Uttarakhand", "first_two_txn": "05", "state_code": "UK", "zone": "North"},
			{"state": "Haryana", "first_two_txn": "06", "state_code": "HR", "zone": "North"},
			{"state": "Delhi", "first_two_txn": "07", "state_code": "DL", "zone": "North"},
			{"state": "Rajasthan", "first_two_txn": "08", "state_code": "RJ", "zone": "West"},
			{"state": "Uttar Pradesh", "first_two_txn": "09", "state_code": "UP", "zone": "North"},
			{"state": "Bihar", "first_two_txn": "10", "state_code": "BH", "zone": "East"},
			{"state": "Sikkim", "first_two_txn": "11", "state_code": "SK", "zone": "North East"},
			{"state": "Arunachal Pradesh", "first_two_txn": "12", "state_code": "AR", "zone": "North East"},
			{"state": "Nagaland", "first_two_txn": "13", "state_code": "NL", "zone": "North East"},
			{"state": "Manipur", "first_two_txn": "14", "state_code": "MN", "zone": "North East"},
			{"state": "Mizoram", "first_two_txn": "15", "state_code": "MI", "zone": "North East"},
			{"state": "Tripura", "first_two_txn": "16", "state_code": "TR", "zone": "North East"},
			{"state": "Meghalaya", "first_two_txn": "17", "state_code": "ME", "zone": "North East"},
			{"state": "Assam", "first_two_txn": "18", "state_code": "AS", "zone": "North East"},
			{"state": "West Bengal", "first_two_txn": "19", "state_code": "WB", "zone": "East"},
			{"state": "Jharkhand", "first_two_txn": "20", "state_code": "JH", "zone": "East"},
			{"state": "Odisha", "first_two_txn": "21", "state_code": "OR", "zone": "East"},
			{"state": "Chattisgarh", "first_two_txn": "22", "state_code": "CT", "zone": "Central"},
			{"state": "Madhya Pradesh", "first_two_txn": "23", "state_code": "MP", "zone": "Central"},
			{"state": "Gujarat", "first_two_txn": "24", "state_code": "GJ", "zone": "West"},
			{"state": "Daman and Diu", "first_two_txn": "25", "state_code": "DD", "zone": "West"},
			{"state": "Dadra and Nagar Haveli", "first_two_txn": "26", "state_code": "DN", "zone": "West"},
			{"state": "Maharashtra", "first_two_txn": "27", "state_code": "MH", "zone": "West"},
			{"state": "Andhra Pradesh", "first_two_txn": "28", "state_code": "AP", "zone": "South"},
			{"state": "Karnataka", "first_two_txn": "29", "state_code": "KA", "zone": "South"},
			{"state": "Goa", "first_two_txn": "30", "state_code": "GA", "zone": "West"},
			{"state": "Lakshadweep Islands", "first_two_txn": "31", "state_code": "LD", "zone": "Coastal Zone"},
			{"state": "Kerala", "first_two_txn": "32", "state_code": "KL", "zone": "South"},
			{"state": "Tamil Nadu", "first_two_txn": "33", "state_code": "TN", "zone": "South"},
			{"state": "Pondicherry", "first_two_txn": "34", "state_code": "PY", "zone": "South"},
			{"state": "Andaman and Nicobar Islands", "first_two_txn": "35", "state_code": "AN", "zone": "Coastal Zone"},
			{"state": "Telangana", "first_two_txn": "36", "state_code": "TS", "zone": "South"},
			{"state": "Andhra Pradesh (New)", "first_two_txn": "37", "state_code": "AD", "zone": "South"}
		],

    custTypes : ['Customer', 'Consignee', 'Consignor', 'Billing party', 'CHA', 'Transporter', 'Others'],

		categoryList : ['Fleet', 'Freight', 'Freight and Fleet'],

		aCategory: ["RCM", "FCM"],

		aPercent: ["0", "5", "12", "18", "24"],

		aRatings: [1, 2, 3, 4, 5],

		aUnits: ['Pcs', 'Ft', 'Tonne', 'Ltr', 'Bags', 'Box','Drum' ,'KG'],

		agpsVendor: ['Axestrack','Netradyne','Sensel','Dhanuka','Intugine', 'UPS','Trimble' ,'Efkon'],

		aConsignorConsigneeTypes: ["Consignor", "Consignee"],

		// aCustomerTypes: av ,

		vehStatus: ["In Trip", "Idle", "Maintenance", "Sold"],

		billingFrequencyClient: ["One time", "Yearly", "Monthly", "Bi-Weekly", "Weekly"],

		clientTypes: ["Indivisual", "Company"],

		idTypes: ["Driving License", "Aadhaar Card", "Passport", "Voter ID"],

		aAccountGroup: ["Bad Dept", "Customer", "Driver", "Happay", "Happay Master", "FastTag", "FastTag Master", "Diesel", "Managers", "Miscellaneous",
			"Vendor", "Sales", "Transaction", "Purchase", 'Toll tax', 'Hire Vehicle', 'Vehicle', 'Cashbook', 'banks', 'Internal Cashbook', 'Diesel-Bill',
			'Car', 'Generator', 'Staff', 'Office', 'Deduction', 'Lorry Hire', 'Loan', 'Others', 'Discount', 'IGST Paid', 'IGST Payable', 'IGST Receivable', 'CGST Paid',
			'CGST Payable', 'CGST Receivable', 'SGST Paid', 'SGST Payable', 'SGST Receivable', 'Adjustment', 'Vendor TDS', 'Receipt Deduction', 'Debtor with Hold'],

		aAccountTypes: ["Purchase Accounts", "Sales Account", "Duties and Taxes", "Direct Expenses", "Indirect Expenses",
			"Indirect Income", "Already Created in Tally", "Bank Account", "Deposit Account", "Capital A/c", "Current Assets",
			"Current Liabilities", "Sundry Creditor", "Loans and Advances (Assets)", "Loans Liabilities", "Fixed Assets",
			"Bank OCC", "Bank OD", "Branch/Divisions", "Cash in Hand", "Investments", "Stock-in-hand", "Misc. Expense (ASSET)",
			"Suspense A/c", "Secured Loan", "Unsecured Loan", "Reserve & Surplus", "Provisions", "Sundry Debtors"],

		fromAcByVoucherType: {
			"Sales": ["Sales Account", "Duties and Taxes", "Indirect Income"],
			"Purchase": ["Direct Expenses", "Indirect Expenses", "Sundry Creditor"],
			"Receipt": ["Duties and Taxes", "Sundry Debtors"],
			"Journal": ["Purchase Accounts", "Sundry Creditor"],
			"Credit Note": ["Sales Account", "Duties and Taxes", "Indirect Income"],
			"Debit Note": ["Purchase Accounts"],
			"Payment": ["Bank Account", "Cash in Hand"]
		},

		toAcByVoucherType: {
			"Receipt": ["Bank Account", "Cash in Hand"],
			"Journal": ["Duties and Taxes", "purchase"],
			"Salse": ["Sundry Debtors"],
			"Credit Note": ["Purchase Accounts"],
			"Debit Note": ["Sales Account", "Indirect Income"],
			"Purchase": ["Purchase Accounts", "Deposit Account"],
			"Payment": ["Duties and Taxes"]
		},

		aVouchersType: ["Receipt", "Journal", "Sales", "Purchase", "Payment", "Contra"],

		employmentTypes: ["Temporary", "Permanent"],

		departmentTypes: ["Production", "Research and Development", "Purchasing", "Marketing",
			"Human Resource Management", "Accounting and Finance"
		],

		roleTypes: ["Manager", "Deputy Manager", "Assistant Manager", "General Manager",
			"Regional Head", "Zonal Head", "Director"
		],

		company_details: {
			company_name: 'FUTURETRUCKS PVT. LTD',
			company_iso: '(AN ISO 9001 : 2008 Certified Company)',
			company_subtitle: 'FLEET OWNERS GOVT. TRANSPORT CONTRACTOR(20,40 FEET TRAILER & COVERED BODY)',
			company_address: 'Registered Office : 75, Khirki Village, Malviya Nagar, New Delhi - 110017. Head Office : F-35/3, Industrial Area, Okhla Phase II, New Delhi - 110020.',
			company_phone: '011-43122798',
			company_fax: '011-43122797',
			company_pan: 'AADCM9293K'
		},
		aExpenseType: ['Spare', 'Tyre', 'Other'],

		roleAccessTypes: ["Read", "Add", "Edit", "Approve", "Remove"],

		mechanicRoleTypes: ["Supervisor", "Mechanic"],

		uomTypes: ["Litre", "Set", "Feet", "Meter", "Kilo", "Piece", "Packet"],

		default_error_message: "Some error occurred. Please try again later",

		vehicleStructureTypes: ["Prime Mover", "Trailer", "Truck"],

		quot_statuses: ["Unapproved", "Expired", "Cancelled", "Approved for sale", "Partially converted to SO",
			"Fully converted to SO"],

		so_statuses: ["Unapproved", "Approved", "Declined", "Partially Invoiced", "Fully Invoiced"],

		billType: ['Maintenance', 'Spare', 'Tyre', 'FPA', 'Printing', 'Diesel', 'Assets', 'lorry Hire'],

		so_invoice_statuses: ["Unapproved", "Approved", "Dispatched", "Cancelled", "Part Payment Received", "Full Payment Received"],

		featureConfigMap: {
			trip: ["start", "end", "arrival", "loading_start", "loading_end", "unloading_start", "unloading_end"],
			booking: ["cancel", "deleted"],
			invoice: ["generated", "approved", "dispatched"],
			payment: ["settlement", "received", "paid", "overdue"],
			maintenance: ["start", "end", "due_date"],
			pod: ["received", "pending_15days"],
			profit_report: ["customer_wise", "date_wise", "daily", "weekly", "monthly", "aggregated"],
			trip_status_report: ["daily", "weekly"],
			"billing_report": ["daily", "weekly", "monthly"],
			"vehicle_status_report": ["daily", "weekly"],
			"costing_report": ["daily", "weekly", "monthly"]
		},

		featureDesc: {
			trip: "Trip",
			booking: "Booking",
			invoice: "Invoice",
			payment: "Payment",
			maintenance: "Maintenance",
			pod: "POD",
			profit_report: "Profitability report",
			trip_status_report: "Trip status report",
			"billing_report": "Billing report",
			"vehicle_status_report": "Vehicle status report",
			"costing_report": "Costing report"
		},

		"featureConfigDesc": {
			"start": "Start",
			"end": "End",
			"arrival": "Arrival",
			"loading_start": "Loading start",
			"loading_end": "Loading end",
			"unloading_start": "Unloading start",
			"unloading_end": "Unloading end",
			"cancel": "Cancel",
			"deleted": "Deleted",
			"generated": "Generated",
			"approved": "Approved",
			"dispatched": "Dispatched",
			"settlement": "Settlement",
			"received": "Received",
			"paid": "Paid",
			"overdue": "Over due",
			"due_date": "Due date",
			"pending_15days": "Pending 15 days",
			"customer_wise": "Customer wise",
			"date_wise": "Date wise",
			"daily": "Daily",
			"weekly": "Weekly",
			"monthly": "Monthly",
			"aggregated": "Aggregated"
		},

		app_key_desc_pair: {
			//"masters": "Masters",
			"branch": "Branch",
			"driver": "Driver",
			"route": "Transport Route",
			"sldo": "SLDO",
			"transportVendor": "All Vendor",
			"billingparty": "Billing Party",
			"consignorConsignee": "Consignor Consignee",
			"cityState": "City State",
			"directory": "Directory",
			"driverCounselling": "Driver Counselling",
			//"maintenanceVendor" :"Maintenance Vendor",
			"courierVendor": "Courier Vendor",
			"fuelVendor": "Fuel Vendor",
			"customerRateChart": "Rate Chart",
			"material": "Material",
			"customer": "Customer",
			//"regvehicle": "Registered Vehicle",
			"vehicle": "Vehicle",
			"registeredFleet": "Fleet",
			"registeredVehicle": "Registered Vehicle",
			"liveTrackPage": "Live Track",
			"liveTracker": "Live Tracker",
			"liveTrip": "Live Trip",
			"grMaster": "GR Master",
			"sendTripLoc": "Trip Location",
			"billBook": "Stationery",
			"incentive": "Incentive",
			"dph": "DPH",
			//"booking": "Booking",
			//"mybooking": "My Booking Management",
			"booking": "Booking",
			"bookings": "Bookings",
			"vehicleAllocation": "Vehicle Allocation",
			"trip": "Trip",
			"tripSettlement": "Trip Settlement",
			"roundTrip": "Round Trip",
			"driverOnVehicle": "Driver And Vehicle Association",
			"tripPerformance": "Trip Performance",
			"gr": "GR",
			"grWithOutTrip": "GR WithOut Trip",
			"createTrip": "Create Trip",
			"locationUpdate": "Update Location",
			"coverNote": "Cover Note",
			"tripAdvance": "Trip Advance",
			"incidental": "Incidental Expense",
			"fpa": "FPA Gr",
			"shipmentTracking": "Shipment Tracking",
			"fpaReports": "FPA Report",
			"diesel": "Diesels",
			"grAcknowledge": "GR Acknowledge",
			"grAckDetails": "GR Acknowledge Details",
			"createGR": "Create GR",
			"vehicleAccident": "Vehicle Accident",
			"tripMemo" : "Trip Memo",
			"ewayBill" : "Eway Bill",
			"vehicleExp" : "Vehicle Expense",

			//"billing": "Billing Management",
			"savePrintBill": "Unbilled Gr",
			//"combineBill":"Combine Bills",
			"generatedBills": "Generated Bills",
			"genBillOBal": "Gen Multi Debitor Bill",
			"genCrBillOBal": "Gen Multi Creditor Bill",
			"tripExpense": "Trip Expense",
			"customerPayment": "Customer Payment",
			"vendorPayment": "Vendor Payment",
			"tripExpenseDetail": "Trip Expense Detail",
			"billDispatch": "Bill Dispatch",
			"billAcknowledge": "Bill Acknowledge",
			"billSettlement": "Bill Settlement",
			"purchaseBill": "Purchase Bill",
			"duesBill": "Dues Bill",
			"genBill": "Sales Invoice",
			"voucher": "Voucher",
			"tdsReport": "TDS Reports",
			"settleSelectedBill": "Money Receipt",
			"creditNote": "Credit Note",
			"debitNote": "Debit Note",

			//"logs": "Log Report",
			"logreport": "Log Report",

			//"reports": "Reports",
			"bookingReports": "Booking Report",
			"purRpt": "Purchase Bill Report",
			"grReports": "GR Report",
			"driverReports": "Driver Reports",
			"tripPerformanceReport": "Trip Performance Report",
			"dailyKmAnalysis": "Daily KM Analysis",
			"SettlementReport": "Settlement Report",
			"unbilledReport": "Unbilled Report",
			"billReport": "Billing Report",
			"costing": "Costing Report",
			"profit": "Profit Report",
			"profitReportGR": "Profit Report - GR",
			"hirePaymentRpt": "Hire Payment Report",
			"initialProfit": "Initial Profit Report",
			"trips": "Trip Report",
			"vehicles": "Vehicle Report",
			"fleetOwner": "Fleet Owner Report",
			"dieselEscalation": "Diesel Escalation",
			"do": "DO",
			"others": "Others",

			//"masters_maintenance": "Maintenance Masters",
			"mechanic": "Mechanic",
			"contractor": "Contractor",
			"modelList": "Model List",
			"taskMaster": "Task Master",
			"maintenance_inventory": "Maintenance Inventory",
			"inventory": "Inventory",
			"aggreInventory": "Aggregated Inventory",
			"toolMaster": "Tools",
			"spareIssue": "Spare ISsue",
			"printSlips": "Spare Slips",
			"dieselMaintenance": "Diesel",
			"otherExpenses": "Expenses",

			// material resource planing
			"customers": "Customers",
			"partCategory": "Category",
			"mrpVendor": "Vendor",
			"spares": "Materials",
			"spareList": "Spare List",

			// MRP PR-PO
			"pr": "PR",
			"prAdd": "Create New PR",
			"PrPo": "PR-PO",
			"POdetail": "PO Detail",
			"POrelease": "PO Release",


			//"maintenance_process": "Job Card",
			"jobCard": "Job Cards",

			//"maintenance_reports": "Maintenance Reports",
			"spareInventory": "Spare Inventory",
			"spareInventoryInward": "Spare Inventory Inward",
			"inventorySnapshot": "Inventory Snapshot",
			"JobCardReports": "Job Card",
			"JobCardTaskReports": "Job Card Task",
			"toolReports": "Tool",
			"toolIssueReport": "Tool Issue",
			"contractorExpenseReport": "Contractor Expense",
			"PRreport": "PR Report",
			"expenseReport": "Expense Report",
			"spareConsumption": "Spare Consumption",
			"combinedExpense": "Combined Expense",
			"masters_tyre_management": "Tyre Masters",
			"tyre_master": "Tyre Master",
			"trailer_master": "Trailer Master",
			"structure_master": "Structure Master",
			"prime_mover_trailer_association": "Prime mover trailer association",
			"retreated": "Retreated",

			//"masters_tyre_reports": "Tyre Report",
			"tyreReports": "Tyre",
			"tyreIssueReport": "Tyre Issue",
			"tyreRetreatReport": "Tyre Retreat",
			"primeTrailerAssoReport": "Prime Trailer association",

			//"client_management": "Client Management",
			"client": "Client",
			"icd": "ICD",

			//"user_management": "User Management",
			"department": "Department",
			"role": "Role",
			"user": "User",
			"dashboard": 'Dashboard',

			//GPS management
			"device_inventory": "Device Inventory",
			"device_slips": "Device Slips",
			"sim_inventory": "Sim Inventory",
			//"customer_master":"Customer Master"

			"quotation": "Quotation",
			'quote-so': 'Quote to SO',
			'so': 'SO',
			'so_invoice': 'SO Invoice',
			"quotation_report": "Quotation Report",
			"so_report": "SO Report",
			"invoice_report_so": "Invoice Report (SO)",

			//Customer contract documnet upload
			"customer_document": "Customer Document Upload",
			"customer_detention": "Customer Document Detention",

			//Accounting Managment
			"account_manster": "Account Master",
			"dayBook": "DayBook",
			"daywise": "Reports",
			"ledger": "Ledger",
			'account_report': 'Account Report',
			'gst_report': 'GST Report',
			'tds_report': 'TDS Report',
			'gstr-1': 'GSTR-1',
			'dues': 'Dues',
			'directOpBalance': 'Direct Op Balance',
			'costCategory': 'Cost Category',
			'costCenter': 'Cost Center',

			//Dashboard
			"summary": "Summary",
			"detail": "Detail",

			//Notification
			"notification": "Notification",

			//GPS
			"mapView": "Map View",
			"gpsDashboard": "GPS Dashboard",
			"gpsMoniter": "GPS Moniter",
			"gpsAnalytic": "Analytics",
			"gpsReports": "GPS Reports",
			"parkingReport": "Parking Reports",
			"historicalTripReport": "Historical Trip Report",

			//Schema Configuration
			"configurations": "Configurations",

			'fpaMaster': 'FPA Master',
		},


		FTData: {
			name: "AKH Tech Logistics Pvt. Ltd. (Future Trucks)",
			pan_no: "22334455",
			tin_no: "33444322",
			service_tax_no: "4322299",
			line1: "F35/3, 2nd Floor",
			line2: "Okhla Industrial Area, Phase 2",
			city: "New Delhi",
			district: "New Delhi",
			state: "New Delhi",
			pincode: "110019",
			country: "India"
		},

		super_admin_role_name: "super_admin",

	};

}
