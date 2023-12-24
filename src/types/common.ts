/* eslint-disable @typescript-eslint/no-explicit-any */
export interface IMeta {
  limit: number;
  page: number;
  total: number;
}

export type ResponseSuccessType = {
  data: any;
  meta?: IMeta;
};

export type IGenericErrorResponse = {
  statusCode: number;
  message: string;
  errorMessages: IGenericErrorMessage[];
};

export type IGenericErrorMessage = {
  path: string | number;
  message: string;
};
export interface IVariation {
  _id: string;
  size: [string];
  color: string;
}
export interface ICartItem {
  productId: string;
  name: string;
  size: string;
  color: string;

  // Add other product details as needed
}
export interface IProducts {
  _id: string;
  userId: string;
  name: string;
  price: string;
  model: string;
  image: string;
  display: {
    size: string;
    type?: string;
    resolution: string;
    features?: string;
  };
  processor: {
    chipset?: string;
    cpuType?: string;
    cpuSpeed?: string;
    gpu?: string;
  };
  memory: {
    ram: string;
    internalStorage: string;
    cardSlot?: string;
  };
  camera: {
    rear: {
      resolution: string;
      features: string;
      videoRecording: string;
    };
    front: {
      resolution: string;
      videoRecording: string;
    };
  };
  audio: {
    speaker: string;
  };
  networkConnectivity: {
    sim: string;
    network: string;
    wifi: string;
    bluetooth: string;
    gps: string;
    nfc: string;
    usb: string;
    audioJack: string;
  };
  os: {
    operatingSystem: string;
    upgradable: string;
    features?: [string];
  };
  features: {
    fingerprint: string;
    sensors: string;
    other: string;
  };
  battery: {
    type?: string;
    capacity?: string;
  };
  physicalSpecification: {
    dimension: string;
    weight: string;
    bodyMaterial: string;
    colors: [string];
  };
  warrantyInformation: {
    warranty: string;
  };
}

export interface IAdmin {
  id?: string;
  name: string;
  email: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}
export interface IUser {
  id?: string;
  name: string;
  email: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}
