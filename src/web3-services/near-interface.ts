import { Wallet } from "./near-wallet";

export type Address = {
  address: string;
  country: string;
  state_or_province: string;
  city: string;
};

export type PlaceInput = {
  name: string;
  address: Address;
  description: string;
  pictures: string[];
  place_type: string;
};

export class PlacesContractInterface {
  public wallet: Wallet;

  constructor(wallet: Wallet) {
    this.wallet = wallet;
  }

  // View methods
  async getPlaces() {
    return await this.wallet.viewMethod({ method: "get_places" });
  }

  async getPlacesById(placeId: number) {
    return await this.wallet.viewMethod({
      method: "get_places_by_id",
      args: { place_id: placeId },
    });
  }

  // Payable / Call Methods

  /**
   * Add a new place
   * @param place
   * @returns
   */
  async addPlace(place: PlaceInput) {
    return await this.wallet.callMethod({
      method: "add_place",
      args: { place },
    });
  }

  /**
   * Compute rating (vote)
   * @param placeId
   * @param vote
   * @param feedback
   * @returns
   */
  async vote(placeId: number, vote: number, feedback?: string) {
    const fixedVote = Math.min(Math.max(vote, 0), 5); // Ensure the value is between 0 and 5

    return await this.wallet.callMethod({
      method: "vote",
      args: { place_id: placeId, vote: fixedVote, feedback },
    });
  }
}
