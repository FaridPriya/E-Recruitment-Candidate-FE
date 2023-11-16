export class JobVacancyDTO{
    Id!: string;
    Name!: string;
    Description!: string;
    IsActive!: boolean;
    PretestQuestionId!: string;
    ListRequirement: JobVacancyRequirementDTO[] = [];
}

export class JobVacancyRequirementDTO{
    Id!: string;
    ApplicantSpecificationId!: string;
    ApplicantSpecificationName!: string;
    JobVacancyId!: string;
}