import type { TrackSet } from './track';
import {
  DemuxedAudioTrack,
  DemuxedMetadataTrack,
  DemuxedPrivdataTrack,
  DemuxedTrack,
  DemuxedUserdataTrack,
  DemuxedVideoTrack,
  MetadataSample,
  PrivdataSample,
  UserdataSample,
} from './demuxer';
import type { SourceBufferName } from './buffer';

export interface Remuxer {
  remux(
    audioTrack: DemuxedAudioTrack,
    videoTrack: DemuxedVideoTrack,
    id3Track: DemuxedMetadataTrack,
    textTrack: DemuxedUserdataTrack,
    privTrack: DemuxedPrivdataTrack,
    timeOffset: number,
    accurateTimeOffset: boolean,
    flush: boolean
  ): RemuxerResult;
  resetInitSegment(
    initSegment: Uint8Array | undefined,
    audioCodec: string | undefined,
    videoCodec: string | undefined
  ): void;
  resetTimeStamp(defaultInitPTS): void;
  resetNextTimestamp(): void;
  destroy(): void;
}

export interface RemuxedTrack {
  data1: Uint8Array;
  data2?: Uint8Array;
  startPTS: number;
  endPTS: number;
  startDTS: number;
  endDTS: number;
  type: SourceBufferName;
  hasAudio: boolean;
  hasVideo: boolean;
  independent?: boolean;
  nb: number;
  transferredData1?: ArrayBuffer;
  transferredData2?: ArrayBuffer;
  dropped?: number;
}

export interface RemuxedMetadata {
  samples: MetadataSample[];
}

export interface RemuxedPrivdata {
  samples: PrivdataSample[];
}

export interface RemuxedUserdata {
  samples: UserdataSample[];
}

export interface RemuxerResult {
  audio?: RemuxedTrack;
  video?: RemuxedTrack;
  text?: RemuxedUserdata;
  id3?: RemuxedMetadata;
  priv?: RemuxedPrivdata;
  initSegment?: InitSegmentData;
  independent?: boolean;
}

export interface InitSegmentData {
  tracks?: TrackSet;
  initPTS: number | undefined;
  timescale: number | undefined;
}
