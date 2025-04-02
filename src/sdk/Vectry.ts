import {
  defaultConfig,
  setRuntimeConfig,
  VectryConfig,
  VectryCore,
} from "@vectry/js-core";
import { HttpTransport } from "../transport/HttpTransport";
import { DefaultContextProvider } from "../context/DefaultContextProvider";

export class Vectry extends VectryCore {
  constructor(config: Partial<VectryConfig>) {
    // Merge the user config with defaults
    const mergedConfig: VectryConfig = {
      ...defaultConfig,
      ...config,
      transport: config.transport ?? new HttpTransport(config),
      contextProvider: config.contextProvider ?? DefaultContextProvider,
    };

    // Set runtime configuration globally for the SDK
    setRuntimeConfig(mergedConfig);

    // Initialize parent class with required fields
    super({
      transport: mergedConfig.transport!,
      organizationId: mergedConfig.organizationId,
    });
  }
}

export function vectry(config: Partial<VectryConfig>): Vectry {
  return new Vectry(config);
}
