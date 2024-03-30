import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema()
export class User {

    // _id: string    mongo lo genera automaticamente
    @Prop({ unique: true, required: true})   //property
    email: string;

    @Prop({ required: true })
    name: string;
    
    @Prop({ minlength: 6, required: true })
    password?: string;
    
    @Prop({ default: true })
    isActive: boolean;

    @Prop({ type: [String], default: ['user'] }) // rol: user/admin/...
    roles: string[];

}

export const UserSchema = SchemaFactory.createForClass( User ) // definicion de la entidad en la BD
