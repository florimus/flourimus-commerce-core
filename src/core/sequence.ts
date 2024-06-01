import { getSystemConfigurations, updateSequenceNumberConfiguration } from "@repositories/organizationRepository";
import { SystemConfigsType } from "@types";

type EntityType = "product" | "customer"
type SequenceConfigurationTypes = {
  prefix: string;
  sufix: string;
  next: number;
  length: number;
  mask: string;
}

const configurations = async (entity: EntityType) => {
  const systemConfigurations: SystemConfigsType = await getSystemConfigurations("SEQUENCES");

  if (systemConfigurations && systemConfigurations.isActive) {
    return systemConfigurations.defaultConfigurations?.[entity] as SequenceConfigurationTypes
  }

  throw Error("Invalid Sequence type")
}

const updateSequenceNumber = async (entity: EntityType, next: number) => {
  await updateSequenceNumberConfiguration(`defaultConfigurations.${entity}.next`, next)
}

const constructId = (config: SequenceConfigurationTypes) => {
  const maskLength: number = config.length - (config.prefix.length + `${config.next}`.length + config.sufix.length);
  return `${config.prefix}${maskLength > 0 ? Array(maskLength + 1).join(config.mask) : ""}${config.next}${config.sufix}`;
}

const sequenceGenerator = async (entity: EntityType) => {
  const config: SequenceConfigurationTypes = await configurations(entity);
  const id = constructId(config);
  updateSequenceNumber(entity, config.next + 1);
  return id;
}

const sequence = {
  productId: async () => await sequenceGenerator("product"),
  customerId: async () => await sequenceGenerator("customer"),
};

export default sequence;
