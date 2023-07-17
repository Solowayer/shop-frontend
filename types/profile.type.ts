export enum Gender {
	MALE = 'MALE',
	FEMALE = 'FEMALE',
	OTHER = 'OTHER'
}

export interface Profile {
	firstName: string
	lastName: string
	gender: Gender
}
