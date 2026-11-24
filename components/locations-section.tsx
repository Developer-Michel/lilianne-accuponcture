"use client";

import { ArrowUpRight, CalendarCheck, Clock3, MapPin } from "lucide-react";
import type { Copy } from "@/lib/translations";
import { BOOKING_URL } from "@/lib/links";

export function LocationsSection({ copy }: { copy: Copy }) {
  return (
    <section id="hours-locations" className="locations-section section-pad">
      <div className="container">
        <div className="section-heading centered">
          <h2>{copy.hoursLocationsTitle}</h2>
        </div>
        <div className="locations-grid">
          {copy.practiceLocations.map((location) => (
            <article className="location-card" key={location.name}>
              <h3>{location.name}</h3>
              <div className="location-detail">
                <MapPin size={19} strokeWidth={1.3} aria-hidden="true" />
                <div>
                  <span className="eyebrow">{copy.locationAddressLabel}</span>
                  <p>{location.address}</p>
                  <a
                    className="text-link location-map-link"
                    href={location.mapsUrl}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {copy.locationMapLink}
                    <ArrowUpRight size={14} />
                  </a>
                </div>
              </div>
              <div className="location-detail">
                <Clock3 size={19} strokeWidth={1.3} aria-hidden="true" />
                <div>
                  <span className="eyebrow">{copy.locationHoursLabel}</span>
                  <ul className="location-hours">
                    {location.hours.map((line) => (
                      <li key={line}>{line}</li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="location-detail">
                <CalendarCheck size={19} strokeWidth={1.3} aria-hidden="true" />
                <div>
                  <span className="eyebrow">{copy.locationBookingLabel}</span>
                  {location.booking === "direct" ? (
                    <p>
                      {copy.locationBookingDirectPrefix}
                      <a href={`tel:+1${location.phone.replace(/\D/g, "")}`}>
                        {location.phone}
                      </a>
                      {copy.locationBookingDirectSuffix}
                    </p>
                  ) : (
                    <p>
                      {copy.locationBookingOnlinePrefix}
                      <a href={BOOKING_URL} target="_blank" rel="noreferrer">
                        {copy.locationBookingOnlineLink}
                      </a>
                      {copy.locationBookingOnlineMiddle}
                      <a href="#contact">{copy.locationBookingContactLink}</a>
                      {copy.locationBookingOnlineSuffix}
                    </p>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
