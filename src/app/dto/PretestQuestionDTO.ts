export class PretestQuestionDTO{
    Id!: string;
    Name!: string;
    Description!: string;
    ListPretestQuestionItem: PretestQuestionItemDTO[] = [];
}

export class PretestQuestionItemDTO{
    Id!: string;
    PretestQuestionId!: string;
    Question!: string;
    IndexNo!: number;
}