import { get, post, patch, del, Token, AuthErrAction } from "./http";
import type { ConfRec } from "../config";
import type { UserProfile } from "core/user";
import { usersUrl, customOntologyUrl } from "core/user";
import { Ontology } from "core/ontologyRegister";

function getProfileUrl(config: ConfRec): string {
  return config.apiServerUrl + config.apiPath + usersUrl;
}

function getCustomOntologiesUrl(config: ConfRec): string {
  return config.apiServerUrl + config.apiPath + customOntologyUrl;
}

export function getUserProfilePm(config: ConfRec, token: Token, authErrAction?: AuthErrAction): Promise<UserProfile> {
  return get<UserProfile>(getProfileUrl(config), {}, { token, authErrAction });
}

export function patchUserProfilePm(config: ConfRec, changes: Record<string, any>, token: Token, authErrAction: AuthErrAction): Promise<UserProfile> {
  return patch<UserProfile>(getProfileUrl(config), { ...changes }, { token, authErrAction });
}

export function getCustomOntologies(config: ConfRec, token: Token, authErrAction: AuthErrAction): Promise<Array<Ontology>> {
  return get(getCustomOntologiesUrl(config), {}, { token, authErrAction });
}

export function addCustomOntology(config: ConfRec, o: Ontology, token: Token, authErrAction: AuthErrAction): Promise<void> {
  return post(getCustomOntologiesUrl(config), { ontologyId: o.id }, { token, authErrAction });
}

export function removeCustomOntology(config: ConfRec, o: Ontology, token: Token, authErrAction: AuthErrAction): Promise<void> {
  return del(getCustomOntologiesUrl(config) + "/" + o.id, { token, authErrAction });
}