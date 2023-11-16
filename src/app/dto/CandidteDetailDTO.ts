export class CandidateDetailDTO{
    Id!: string;
    Name!: string;
    IdJobVacancy!: string;
    JobVacancyName!: string;
    NoHandphone!: string;
    Email!: string;
    CreatedAt!: Date;
    UpdatedAt!: Date;
    AIScreeningStatus!: string;
    AIScreeningResult!: string;
    Education: SpecCandidate[] = [];
    Experience: SpecCandidate[] = [];
    Skill: SpecCandidate[] = [];
    Status!: string;
    ApplyDate!: string;
    IsAlreadyCVUpload!: boolean;
}

export class SpecCandidate{
    ApplicantId!: string;
    ApplicantItemId!: string;
    ApplicantItemName!: string;
    ApplicantName!: string;
    ApplicantType!: string;
    AiPassed!: boolean;
}