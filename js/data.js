var steps=[
	{
		Name: '1. Site Selection',
		StepValue: '1.0',
		Type: 'Step',
		Group: 1
	},{
		Name: 'Community Meetings',
		StepValue: '1.1',
		Type: 'SubStep',
		Group: 1
	},{
		Name: '2. Data Collection',
		StepValue: '2.0',
		Type: 'Step',
		Group: 2
	},{
		Name: 'Literature Review',
		StepValue: '2.1',
		Type: 'SubStep',
		Group: 2
	},{
		Name: 'Prioritization Criteria Selected',
		StepValue: '2.2',
		Type: 'SubStep',
		Group: 2
	},{
		Name: '3. Decision Support Tool Selection',
		StepValue: '3.0',
		Type: 'Step',
		Group: 3
	},{
		Name: 'Evaluate Tools',
		StepValue: '3.1',
		Type: 'SubStep',
		Group: 3
	},{
		Name: '4. Data Analysis',
		StepValue: '4.0',
		Type: 'Step',
		Group: 4
	},{
		Name: 'OpenNSPECT',
		StepValue: '4.1',
		Type: 'SubStep',
		Group: 4
	},{
		Name: 'Hot Spot Analysis',
		StepValue: '4.2',
		Type: 'SubStep',
		Group: 4
	},{
		Name: 'Raster Calculations',
		StepValue: '4.3',
		Type: 'SubStep',
		Group: 4
	},{
		Name: '5. Restoration Impact Analysis',
		StepValue: '5.0',
		Type: 'Step',
		Group: 5
	},{
		Name: 'OpenNSPECT Scenarios',
		StepValue: '5.1',
		Type: 'SubStep',
		Group: 5
	},{
		Name: 'Reduction Trend Statistics',
		StepValue: '5.2',
		Type: 'SubStep',
		Group: 5
	},{
		Name: '6. Ancillary Analysis',
		StepValue: '6.0',
		Type: 'Step',
		Group: 6
	},{
		Name: 'Parcel Prioritization',
		StepValue: '6.1',
		Type: 'SubStep',
		Group: 6
	},{
		Name: 'Future Development',
		StepValue: '6.2',
		Type: 'SubStep',
		Group: 6
	}
],
	colors= ['#253494','#397ca6','#50b8ae','#6aca93','#8bdb87','#e8f6ba'],

	longcolors=['#253494','#2e589d','#397ca6','#449faf','#50b8ae','#5cc1a0','#6aca93','#78d28a','#8bdb87','#ade497','#cceda8','#e8f6ba','#ffffcc'];


var nestedSteps = [
	{
		Name: '1. Site Selection',
		StepValue: '1.0',
		Type: 'Step',
		Group: 1,
		SubSteps: 
		[
			{
				Name: 'Community Meetings',
				StepValue: '1.1',
				Type: 'SubStep',
				Group: 1
			}
		]
	},{
		Name: '2. Data Collection',
		StepValue: '2.0',
		Type: 'Step',
		Group: 2,
		SubSteps: 
		[
			{
				Name: 'Literature Review',
				StepValue: '2.1',
				Type: 'SubStep',
				Group: 2
			},{
				Name: 'Prioritization Criteria Selected',
				StepValue: '2.2',
				Type: 'SubStep',
				Group: 2
			}
		]
	},{
		Name: '3. Decision Support Tool Selection',
		StepValue: '3.0',
		Type: 'Step',
		Group: 3,
		SubSteps: 
		[
			{
				Name: 'Evaluate Tools',
				StepValue: '3.1',
				Type: 'SubStep',
				Group: 3
			}
		]
	},{
		Name: '4. Data Analysis',
		StepValue: '4.0',
		Type: 'Step',
		Group: 4,
		SubSteps: 
		[
			{
				Name: 'OpenNSPECT Runoff Analysis',
				StepValue: '4.1',
				Type: 'SubStep',
				Group: 4
			},{
				Name: 'Hot Spot Analysis',
				StepValue: '4.2',
				Type: 'SubStep',
				Group: 4
			},{
				Name: 'Potentially Restorable Wetland Prioritization',
				StepValue: '4.3',
				Type: 'SubStep',
				Group: 4
			}
		]
	},{
		Name: '5. Restoration Impact Analysis',
		StepValue: '5.0',
		Type: 'Step',
		Group: 5,
		SubSteps: 
		[
			{
				Name: 'Investigate Potential Impacts',
				StepValue: '5.1',
				Type: 'SubStep',
				Group: 5
			}
		]
	},{
		Name: '6. Ancillary Analysis',
		StepValue: '6.0',
		Type: 'Step',
		Group: 6,
		SubSteps: 
		[
			{
				Name: 'Parcel Prioritization',
				StepValue: '6.1',
				Type: 'SubStep',
				Group: 6
			},{
				Name: 'Future Development',
				StepValue: '6.2',
				Type: 'SubStep',
				Group: 6
			}
		]
	}
];