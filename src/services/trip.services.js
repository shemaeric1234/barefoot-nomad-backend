import db from '../database/models';
import Queries from './Queries';
/** trip service */
class tripService {
/**
    * creating user query
    * @param {string} tripsRequest users table in database.
    * @returns {array} data the data to be returned.
    */
  static async CreateTripRequest(tripsRequest) {
    return Queries.create(db.requesttrip, tripsRequest);
  }

  /**
    * creating trip query
    * @param {object} req users table in database.
    * @param {Object} body it gets the data from req.body
    * @param {long} tripId it will specify which type of trip(round, one-way, multi-city)
    * @param {String} tripType it will specify which type of trip(round, one-way, multi-city)
    * @returns {array} data that was created
    */
  static async CreateTrip(req, body, tripId, tripType) {
    const data = {
      reasons: body.reasons,
      originId: body.From,
      destinationId: body.To,
      accomodationId: body.accomodationId,
      departureDate: body.departureDate,
      returnDate: '' || body.returnDate,
      userId: req.user.id,
      tripId,
      tripType
    };
    return Queries.create(db.trips, data);
  }

  /** Finds all bookings of a single user
   *
   * @param {integer} tripId
   * @returns {array} the bookings that was found
   */
  static async findRequestByUser(tripId) {
    try {
      const requestedTrip = await Queries.findRequestByUser(db.requesttrip, tripId);
      return requestedTrip;
    } catch (error) {
      return error;
    }
  }

  /**
   * This method will provide a service of inserting
   * a trip data in database
   * @param {Object} req request from user
   * @param {Object} body data posted by user
   * @param { integer } tripId trip id as integer
   * @param {Object} tripType type of trip
   * @returns { Object } response data
   */
  static async CreateMultiCityTrip(req, body, tripId, tripType) {
    const data = {
      tripId,
      originId: body.From,
      reason: body.reason,
      destinationId: body.To,
      departureDate: body.departureDate,
      accomodationId: body.accomodationId,
      tripType,
      leavingDays: body.leavingDays,
      userId: req.user.id
    };

    return Queries.create(db.trips, data);
  }

  /**
    * searching a trip
    * @param {date} travelDate the travel date in database.
    * @param {integer} userId user id in database.
    * @returns {array} data the data to be returned.
    */
  static async findBooking(travelDate, userId) {
    try {
      const booking = await Queries.findBooking(db.bookings, travelDate, userId);
      return booking;
    } catch (error) {
      return error;
    }
  }

  /** Searchs for trip by the origin and destination of the trip
   * @param {integer} userId the origin
   * @param {integer} travelDate the destination
   * @returns {array} trip that was found
   */
  static async findTrip(userId) {
    try {
      const trip = await Queries.findTrip(db.trips, userId);
      return trip;
    } catch (error) {
      return error;
    }
  }


  /**
   *
   * @param {Integer} userId the id of the user
   * @returns {Object} the booking of the exact passed user id
   */
  static async findBookingByUser(userId) {
    try {
      const bookUser = await Queries.findAccommodation(db.trips, userId);
      return bookUser;
    } catch (error) {
      return error;
    }
  }

  /**
    * This method will provide a service of inserting
    * a trip request in database
    * @param {Object} data posted by user
    * @returns { Object } response data
    */
  static async CreateMultiCityTripRequest(data) {
    return Queries.create(db.requesttrip, data);
  }

  /**
    * searching a trip
    * @param {integer} userId user id in database.
    * @returns {array} data the data to be returned.
    */
  static async findUserRequest(userId) {
    try {
      const request = await Queries.findUserRequest(db.requesttrips, userId);
      if (request.dataValues) return request;
    } catch (error) {
      return error;
    }
  }

  /**
   *
   * @param {Integer} userId the id of the user
   * @returns {Object} the booking of the exact passed user id
   */
  static async findUserManager(userId) {
    try {
      const trip = await Queries.findTrip(db.usermanagement, userId);
      return trip;
    } catch (error) {
      return error;
    }
  }

  /**
    * find trip services
    * @param {Object} res user response
    * @param {Object} from from origin
    * @param {Object} to user response
    * @returns { Object} user response
    */
  static async findUserTrip(res, from, to) {
    try {
      const trip = await Queries.findUserTrip(db.trips, from, to);
      if (!trip) {
        return false;
      }
      return trip;
    } catch (error) {
      return error;
    }
  }

  /**
    * searching a trip
    * @param {string} from the supported places in database.
    * @param {string} to the supported places in database.
    * @returns {array} data the data to be returned.
    */
  static async findSupportedPlaces(from, to) {
    try {
      const place = await Queries.findPlace(db.locations, from, to);
      return place;
    } catch (error) {
      return error;
    }
  }

  /**
   *
   * @param {Integer} managerId the id of the manager
   * @param {Object} limit which includes
   * @param {Object} offset number
   * @returns {Object} the booking of the exact passed user id
   */
  static async findTripRequestsByManager(managerId, limit, offset) {
    try {
      const bookUser = await Queries.findTripRequestsByManager(db.requesttrip, managerId, limit, offset);
      return bookUser;
    } catch (error) {
      return error;
    }
  }

  /**
   *
   * @param {Integer} userId the id of the user
   * @param {Integer} limit the integer for the entry per page
   * @param {Integer} offset the integer for going to the next pages
   * @returns {Object} the booking of the exact passed user id
   */
  static async getTripRequestsByUserId(userId, limit, offset) {
    try {
      const bookUser = await Queries.findRecordById(db.requesttrip, userId, limit, offset);
      return bookUser;
    } catch (error) {
      return error;
    }
  }
}

export default tripService;