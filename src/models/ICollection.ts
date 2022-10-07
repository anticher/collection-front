import { Theme } from "./ITheme";

export interface ICollection {
    id: string;
    name: string;
    description: string;
    image?: any;
    ownerId: string;
    creatorId: string;
    createDate: string;
    updateDate?: any;
    updatedBy?: any;
    items: any[];
    theme: Theme;
}
