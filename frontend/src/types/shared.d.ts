export type Article={
    id:string;slug:string;
title:string;content:string;image?:string;status?:ArticleStatus,intro?:string;createdAt:number|Date;updatedAt?:number|Date; author:{
    name:string;avatar?:string
}
}
export type ArticleStatus='published'|'draft'