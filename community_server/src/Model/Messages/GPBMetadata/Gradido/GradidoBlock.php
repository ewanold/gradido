<?php
# Generated by the protocol buffer compiler.  DO NOT EDIT!
# source: gradido/GradidoBlock.proto

namespace GPBMetadata\Gradido;

class GradidoBlock
{
    public static $is_initialized = false;

    public static function initOnce() {
        $pool = \Google\Protobuf\Internal\DescriptorPool::getGeneratedPool();

        if (static::$is_initialized == true) {
          return;
        }
        \GPBMetadata\Gradido\GradidoTransaction::initOnce();
        \GPBMetadata\Gradido\BasicTypes::initOnce();
        $pool->internalAddGeneratedFile(
            '
�
gradido/GradidoBlock.proto
GradidoBlock

id (6
transaction (2!.proto.gradido.GradidoTransaction1
received (2.proto.gradido.TimestampSeconds
version_number (
running_hash (

message_id (bproto3'
        , true);

        static::$is_initialized = true;
    }
}
