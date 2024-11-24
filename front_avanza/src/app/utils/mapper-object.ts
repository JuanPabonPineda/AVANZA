import {UserProfile} from "../commons/model/interfaces";
import {ɵFormGroupValue, ɵTypedOrUntyped} from "@angular/forms";

export class MapperObject {

  public buildUserProfile(value: ɵTypedOrUntyped<any, ɵFormGroupValue<any>, any>): UserProfile {
    const usuario: UserProfile = {
      lastName: value.lastName,
      position: value.position,
      password: value.password,
      name: value.name,
      rol: value.rol,
      username: value.username,
    }
    return usuario
  }
}
